import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "dotenv/config";


import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import NativeAd from "@/components/Nativead";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config";
import "./globals.css";


const font = Quicksand({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#22C55E",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    afterSignOutUrl="/"
      appearance={{
        layout: {
          logoImageUrl: "/favicon.ico",
        },
        variables: {
          colorPrimary: "#22C55E",
        },
      }}
    >
      <html lang="en">
        <body className={font.className}>
          <Toaster theme="light" richColors closeButton />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
          <NativeAd />
        </body>
      </html>
    </ClerkProvider>
  );
}
