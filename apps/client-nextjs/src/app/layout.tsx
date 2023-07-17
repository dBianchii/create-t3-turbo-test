"use client";

import { api } from "~/utils/api";

import "./globals.css";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default api.withTRPC(RootLayout);
