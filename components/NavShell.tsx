"use client";

import { usePathname } from "next/navigation";
import SideNav from "./SideNav";
import CaseStudySideNav from "./CaseStudySideNav";

export default function NavShell() {
  const pathname = usePathname();
  const isCaseStudy = pathname.startsWith("/case-study/");

  if (isCaseStudy) return <CaseStudySideNav />;
  return <SideNav />;
}
