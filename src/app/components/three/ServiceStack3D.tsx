"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Html,
  Lightformer,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  RoundedBox,
} from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import type { Group } from "three";
import ServiceRow from "../ServiceRow";
import type { ServiceItem } from "../serviceData";

function useScrollProgress(containerRef: React.RefObject<HTMLDivElement | null>) {
  const progressRef = useRef(0);

  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      progressRef.current = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerRef]);

  return progressRef;
}

// Needs to be large enough that a card's <Html transform> DOM box (which can
// be a few hundred CSS px tall) is fully outside the camera's visible
// frustum at this offset, not just past some small margin — verified
// empirically via scroll screenshots, not just by the position math.
const START_Y = -16;
const Z_STEP = 0.4;
const RISE_FRACTION = 0.65;

const FOV = 22;
const BLOCK_W = 4.8;
const BLOCK_H = 3.0;
const CARD_CSS_WIDTH = 680;
// Sets how big the HTML content renders relative to its glass block. drei
// scales Html by distanceFactor/distance, and the block projects by 1/distance
// too, so this ratio holds at every card depth and every camera distance.
const CONTENT_DISTANCE_FACTOR = 2.4;

// Pulls the camera back far enough that the nearest (last) block still fits
// the canvas, at any aspect ratio — a fixed camera z overflows on narrow or
// short viewports.
function SceneCamera({ maxBlockZ }: { maxBlockZ: number }) {
  const { size } = useThree();
  const aspect = size.width / Math.max(1, size.height);
  const frustum = 2 * Math.tan((FOV * Math.PI) / 180 / 2);
  const distForWidth = BLOCK_W / 0.84 / (frustum * aspect);
  const distForHeight = BLOCK_H / 0.82 / frustum;
  const z = maxBlockZ + Math.max(distForWidth, distForHeight);

  return <PerspectiveCamera makeDefault fov={FOV} position={[0, 0, z]} />;
}

/**
 * The transmission shaders cost ~1.5s to compile the first time a glass block
 * is actually drawn. Since blocks stay culled until they rise, that lands right
 * when the user scrolls in and reads as a freeze — so compile up front instead,
 * off the main thread where the browser supports it.
 */
function WarmUpShaders() {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const renderer = gl as typeof gl & {
      compileAsync?: (scene: unknown, camera: unknown) => Promise<unknown>;
    };
    if (typeof renderer.compileAsync === "function") {
      renderer.compileAsync(scene, camera).catch(() => {});
    } else {
      gl.compile(scene, camera);
    }
  }, [gl, scene, camera]);

  return null;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function riseProgress(p: number, i: number, count: number) {
  const rangeStart = i / count;
  const rangeEnd = rangeStart + RISE_FRACTION / count;
  const local = Math.min(1, Math.max(0, (p - rangeStart) / (rangeEnd - rangeStart)));
  return easeOutCubic(local);
}

function Blocks({
  services,
  progressRef,
}: {
  services: ServiceItem[];
  progressRef: React.RefObject<number>;
}) {
  const groups = useRef<(Group | null)[]>([]);
  const htmlEls = useRef<(HTMLDivElement | null)[]>([]);
  // last values written to the DOM, so we only touch style when it changed —
  // writing all six subtrees every frame forces needless style recalcs
  const applied = useRef<{ shown: boolean; opacity: number; blur: number }[]>([]);
  const count = services.length;
  const eased = useRef<number[]>([]);

  useFrame(() => {
    const p = progressRef.current;
    for (let i = 0; i < count; i++) eased.current[i] = riseProgress(p, i, count);

    for (let i = 0; i < count; i++) {
      const rise = eased.current[i];
      const coveredBy = i + 1 < count ? eased.current[i + 1] : 0;
      // off-screen below, or fully hidden behind the next card
      const onScreen = rise > 0.001 && coveredBy < 0.995;

      const group = groups.current[i];
      if (group) {
        // culling matters a lot here: an invisible mesh skips its transmission
        // pass entirely, and only one or two cards are ever really on screen
        group.visible = onScreen;
        if (onScreen) {
          const restZ = i * Z_STEP;
          const startZ = restZ - 1.6;
          group.position.y = START_Y + (0 - START_Y) * rise;
          group.position.z = startZ + (restZ - startZ) * rise;
        }
      }

      // drei's Html `occlude` (raycast-based) doesn't reliably hide text
      // behind a transmissive glass material, so covering is driven directly
      // from the same progress values instead of relying on WebGL depth/raycast.
      const html = htmlEls.current[i];
      if (!html) continue;

      const prev = (applied.current[i] ??= { shown: true, opacity: -1, blur: -1 });

      if (!onScreen) {
        if (prev.shown) {
          html.style.display = "none";
          prev.shown = false;
        }
        continue;
      }

      if (!prev.shown) {
        html.style.display = "";
        prev.shown = true;
      }

      const opacity = Math.round((1 - coveredBy) * 100) / 100;
      const blur = Math.round(coveredBy * 10 * 2) / 2;

      if (opacity !== prev.opacity) {
        html.style.opacity = String(opacity);
        html.style.transform = `scale(${1 - coveredBy * 0.06})`;
        html.style.pointerEvents = coveredBy > 0.15 ? "none" : "auto";
        prev.opacity = opacity;
      }
      if (blur !== prev.blur) {
        // `blur(0px)` still promotes a compositing layer for the whole card
        html.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
        prev.blur = blur;
      }
    }
  });

  return (
    <>
      {services.map((service, i) => (
        <group
          key={service.title}
          ref={(el) => {
            groups.current[i] = el;
          }}
          position={[0, START_Y, i * Z_STEP - 1.6]}
        >
          <RoundedBox args={[BLOCK_W, BLOCK_H, 0.16]} radius={0.09} smoothness={4}>
            <MeshTransmissionMaterial
              transmission={1}
              roughness={0.15}
              thickness={0.45}
              chromaticAberration={0.02}
              anisotropy={0.15}
              samples={2}
              resolution={128}
              ior={1.15}
              color="#1B5AF0"
            />
          </RoundedBox>
          <Html transform center distanceFactor={CONTENT_DISTANCE_FACTOR} position={[0, 0, 0.12]}>
            <div
              ref={(el) => {
                htmlEls.current[i] = el;
              }}
              style={{ width: CARD_CSS_WIDTH }}
            >
              <ServiceRow
                index={i + 1}
                title={service.title}
                exploreLabel={service.exploreLabel}
                description={service.description}
                tags={service.tags}
                graphic={<service.Graphic tiltDisabled />}
                animateEntrance={false}
                twoCol
              />
            </div>
          </Html>
        </group>
      ))}
    </>
  );
}

export default function ServiceStack3D({ services }: { services: ServiceItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useScrollProgress(containerRef);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${services.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
          <SceneCamera maxBlockZ={(services.length - 1) * Z_STEP} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 8]} intensity={0.4} />
          <Suspense fallback={null}>
            {/* Procedural instead of preset="city": the preset fetches a 1k HDR
                from a third-party CDN and prefilters it (PMREM), which stalls
                the first frames. Light panels give the glass real reflections
                with no network dependency, rendered once. */}
            <Environment resolution={64} frames={1}>
              {/* small, dim panels: just enough for edge glints. Large/bright
                  ones flood the transmissive material into a solid slab. */}
              <Lightformer intensity={0.5} position={[0, 3, 3]} scale={[4, 0.6, 1]} color="#dce8ff" />
              <Lightformer intensity={0.35} position={[-4, 0, 2]} scale={[1.5, 3, 1]} color="#22d3ee" />
              <Lightformer intensity={0.3} position={[4, 0, 2]} scale={[1.5, 3, 1]} color="#4c7cff" />
            </Environment>
          </Suspense>
          <Blocks services={services} progressRef={progressRef} />
          <WarmUpShaders />
        </Canvas>
      </div>
    </div>
  );
}
