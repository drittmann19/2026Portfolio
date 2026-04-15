import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Gasoek_One, JetBrains_Mono } from "next/font/google";
import NavShell from "@/components/NavShell";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const gasoekOne = Gasoek_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gasoek",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
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
    <html lang="en" className={`${plusJakartaSans.variable} ${gasoekOne.variable} ${jetbrainsMono.variable}`}>
<body>
        {/* Desktop side nav */}
        <div className="hidden lg:block">
          <NavShell />
        </div>

        {/* Mobile / tablet top nav */}
        <MobileNav />

        {/* Main content */}
        <main className="lg:pl-[280px]" style={{ maxWidth: "1800px" }}>
          <div className="px-12 pt-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
