"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItemsFor } from "./SiteNav";

/* Figure rail (XL only) — active state computed from viewport center on
   scroll so it survives instant anchor jumps; flips light over the dark
   contact footer. Port of the mockup's rail logic. */
export default function Rail() {
  const pathname = usePathname();
  const items = navItemsFor(pathname);
  const [active, setActive] = useState(items[0]?.id);
  const [dark, setDark] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const compute = () => {
      ticking.current = false;
      const mid = window.innerHeight / 2;
      let current = items[0]?.id;
      for (const item of items) {
        const sec = document.getElementById(item.id);
        if (sec && sec.getBoundingClientRect().top <= mid) current = item.id;
      }
      setActive(current);
      setDark(current === "contact");
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    compute();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <nav className={`rail mono${dark ? " rail-dark" : ""}`} aria-label="Section index">
      {items.map((item, i) => (
        <a key={item.id} href={`#${item.id}`} className={active === item.id ? "on" : ""}>
          <b>{String(i).padStart(2, "0")}</b> {item.label === "Selected Work" ? "Work" : item.label}
        </a>
      ))}
    </nav>
  );
}
