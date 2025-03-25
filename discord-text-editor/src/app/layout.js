import { Providers } from "./providers";

export const metadata = {
  title: "Discord Text Generator",
  description: "Generate colored text for Discord",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
