"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import FallbackStack from "./FallbackStack";
import ServiceStack3DBoundary from "./ServiceStack3DBoundary";
import type { ServiceItem } from "./serviceData";
import { useIsMobile } from "./useIsMobile";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useWebglSupport } from "./useWebglSupport";

// Only ever reached client-side, and only once `use3D` is true below — keeps
// three/@react-three/* out of the bundle (and off the network) for anyone who
// gets the fallback.
const ServiceStack3D = dynamic(() => import("./three/ServiceStack3D"), { ssr: false });

export default function ServiceStackGate({ services }: { services: ServiceItem[] }) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const webglOk = useWebglSupport();

  useEffect(() => {
    const mount = () => setMounted(true);
    mount();
  }, []);

  const use3D = mounted && !isMobile && !reducedMotion && webglOk;

  if (!use3D) {
    return <FallbackStack services={services} />;
  }

  return (
    <ServiceStack3DBoundary fallback={<FallbackStack services={services} />}>
      <ServiceStack3D services={services} />
    </ServiceStack3DBoundary>
  );
}
