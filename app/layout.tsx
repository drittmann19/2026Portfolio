import type { Metadata } from "next";
import { Fraunces, Archivo, Spline_Sans_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import SiteNav from "@/components/SiteNav";
import Rail from "@/components/Rail";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://dameanrittmann.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Damean Rittmann — Product Designer",
    template: "%s — Damean Rittmann",
  },
  description:
    "Product designer building trust into high-stakes workflows. 60%+ faster execution, 50% fewer errors, $500M+ fintech platform.",
  openGraph: {
    type: "website",
    siteName: "Damean Rittmann",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable} ${splineSansMono.variable}`}>
<body>
        <SiteNav />
        <Rail />
        <main>{children}</main>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-DGN5P8HTDG" />
    </html>
  );
}
