import "./globals.css";
import { ReactNode } from "react";
import { metadata } from "./metadata";

export { metadata };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
