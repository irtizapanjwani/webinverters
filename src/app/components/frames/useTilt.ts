"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

const MAX_TILT = 6;

export function useTilt(disabled = false) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [0, 1], [MAX_TILT, -MAX_TILT]);
  const rotateY = useTransform(springX, [0, 1], [-MAX_TILT, MAX_TILT]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    // Inside a WebGL/CSS-3D-transformed ancestor (e.g. drei's <Html transform>),
    // getBoundingClientRect no longer reflects real screen space, so the tilt
    // math would be garbage — skip it entirely there.
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    if (disabled) return;
    x.set(0.5);
    y.set(0.5);
  }

  return {
    ref,
    rotateX: disabled ? 0 : rotateX,
    rotateY: disabled ? 0 : rotateY,
    onMouseMove,
    onMouseLeave,
  };
}
