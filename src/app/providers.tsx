"use client";

import { NextUIProvider } from "@nextui-org/react";
import dynamic from "next/dynamic";

const DynamicAccountProvider = dynamic(
  () => import("@/context/account-context"),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <DynamicAccountProvider>{children}</DynamicAccountProvider>
    </NextUIProvider>
  );
}
