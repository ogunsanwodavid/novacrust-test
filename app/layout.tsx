import { ReactNode, Suspense } from "react";

import type { Metadata } from "next";

import Providers from "./providers";

import LayoutContent from "./components/ui/global/LayoutContent";

import "./globals.css";

export const metadata: Metadata = {
  title: "Novacrust",
  description: "David Ogunsanwo submission for Novacrust frontend test",
  openGraph: {
    title: "Novacrust",
    description: "David Ogunsanwo submission for Novacrust frontend test",
    images:
      "https://res.cloudinary.com/ddcjuf3hq/image/upload/v1718069703/dave2_lgolmr.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Suspense fallback={null}>
          <Providers>
            <LayoutContent>{children}</LayoutContent>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
