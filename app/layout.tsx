import type { Metadata } from "next";
import { DM_Sans, Gasoek_One } from "next/font/google";
import NavShell from "@/components/NavShell";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const gasoekOne = Gasoek_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gasoek",
  display: "swap",
});

// TODO: update to your actual domain before deploying
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
    <html lang="en" className={`${dmSans.variable} ${gasoekOne.variable}`}>
<body>
        {/* Desktop side nav */}
        <div className="hidden lg:block">
          <NavShell />
        </div>

        {/* Mobile / tablet top nav */}
        <MobileNav />

        {/* Main content */}
        <main className="lg:ml-[280px]">
          <div className="px-4 tablet:px-12 pt-10 mx-auto" style={{ maxWidth: "1800px" }}>
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}
