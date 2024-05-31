"use client";

import { NextUIProvider } from "@nextui-org/react";
import dynamic from "next/dynamic";

// This component references `window` under the hood
// Fix pre-render errors
const ZKVProvider = dynamic(() => import("@/providers/zkv-provider"), {
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ZKVProvider>{children}</ZKVProvider>
    </NextUIProvider>
  );
}
