import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";
import { ALLOW_INDEXING, SITE_NAME, SITE_URL } from "@/lib/site";

const anton = localFont({
  src: "./fonts/anton-latin-400-normal.woff2",
  variable: "--font-anton",
  weight: "400",
  display: "swap",
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
});

const instrument = localFont({
  src: [
    { path: "./fonts/instrument-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/instrument-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "system-ui", "sans-serif"],
});

const script = localFont({
  src: "./fonts/mrs-saint-delafield-latin-400-normal.woff2",
  variable: "--font-elanor-script",
  weight: "400",
  display: "swap",
  preload: false,
});

const DESCRIPTION =
  "ÉLANOR womenswear concept storefront: tailoring, dresses and everyday pieces in warm, wearable colour. Sample products for demonstration only.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "ÉLANOR — Everyday pieces with an individual point of view", template: "%s — ÉLANOR" },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: "ÉLANOR — Everyday pieces with an individual point of view",
    description: DESCRIPTION,
    images: [{ url: "/images/hero-campaign.png", width: 1536, height: 1024, alt: "Woman in rust tailoring in a sunlit plaster room" }],
  },
  twitter: { card: "summary_large_image" },
  robots: ALLOW_INDEXING ? undefined : { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F6F4EF",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. Grammarly) add attributes to <html>/<body>
    // before React hydrates. This only silences attribute mismatches on these two elements.
    <html lang="en" className={`${anton.variable} ${instrument.variable} ${script.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>
          <div id="site">
            <a className="skip" href="#main">
              Skip to content
            </a>
            <Header />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
          <Suspense fallback={null}>
            <Overlays />
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
