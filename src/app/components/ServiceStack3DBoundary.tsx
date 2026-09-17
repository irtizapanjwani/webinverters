"use client";

import { Component, type ReactNode } from "react";

export default class ServiceStack3DBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // The 3D scene depends on a remote HDR fetch (drei's Environment preset)
    // and WebGL context creation, both of which can fail at runtime even
    // after the capability pre-checks pass. Fail soft into the CSS stack.
    console.error("Service stack 3D scene failed, falling back to CSS stack:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
