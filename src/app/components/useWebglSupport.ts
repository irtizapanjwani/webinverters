"use client";

import { useEffect, useState } from "react";

function detectWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}

export function useWebglSupport() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const check = () => setSupported(detectWebgl());
    check();
  }, []);

  return supported;
}
