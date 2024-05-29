// app/providers.tsx
"use client";

import AccountProvider from "@/context/account-context";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AccountProvider>{children}</AccountProvider>
    </NextUIProvider>
  );
}
