"use client";

import "./globals.css";

import type { Metadata } from "next";
import type { AppType } from "next/app";
import { Inter } from "next/font/google";

import { trpc } from "../utils/trpc";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
