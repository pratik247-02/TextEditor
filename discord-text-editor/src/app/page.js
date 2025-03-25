"use client";

import { MantineProvider } from "@mantine/core";
import TextEditor from "./TextEditor";

export default function Home() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <main>
        <TextEditor />
      </main>
    </MantineProvider>
  );
}
