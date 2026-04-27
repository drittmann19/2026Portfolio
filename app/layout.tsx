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

export const metadata: Metadata = {
  title: "Damean Rittmann — Product Designer",
  description:
    "Product Designer specializing in complex, high-stakes systems. Reduced payment times by 85%, errors by 50%. Currently seeking product design roles in fintech and AI.",
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
