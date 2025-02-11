import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { PHProvider, PostHogPageview } from "@/lib/analytics/context";
import { Suspense } from "react";
import localFont from "next/font/local";
import { HudStateProvider } from "@/components/hud-ui/hud-state-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FCS - Portfolio",
  description: "000-Portfolio",
};

const Arthemys = localFont({ src: "./Assets/Arthemys-Light.woff2" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <body className={`${inter.className}`}>
        <PHProvider>
          <HudStateProvider>
            {children}
            <Toaster />
          </HudStateProvider>
        </PHProvider>
      </body>
    </html>
  );
}
