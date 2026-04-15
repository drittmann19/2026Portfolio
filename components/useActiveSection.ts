"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: string[], offset = 80): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const update = () => {
      const { scrollY, innerHeight } = window;
      const docHeight = document.documentElement.scrollHeight;

      // If at the bottom of the page, activate the last section
      if (scrollY + innerHeight >= docHeight - 4) {
        setActive(ids[ids.length - 1]);
        return;
      }

      const scrollMid = scrollY + offset;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMid) current = id;
      }
      setActive(current);
    };

    update(); // set correct state immediately on mount
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ids, offset]);

  return active;
}
