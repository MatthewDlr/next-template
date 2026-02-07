"use client";

import ReactLenis from 'lenis/react';
import { PropsWithChildren } from "react";

export default function Lenis({ children }: PropsWithChildren) {

    return (
    <ReactLenis options={{ duration: 2 }} root>
      {children}
    </ReactLenis>
  );
}
