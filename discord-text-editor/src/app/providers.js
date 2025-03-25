"use client";

import { MantineProvider } from "@mantine/core";

export function Providers({ children }) {
  return <MantineProvider withGlobalStyles withNormalizeCSS>{children}</MantineProvider>;
}
