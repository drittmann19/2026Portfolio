"use client";

import { useEffect, useRef, useState } from "react";

export function useActiveSection(ids: string[], offset = 80): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const lockedRef = useRef(false);
  const settledScrollY = useRef<number | null>(null);

  useEffect(() => {
    const detect = () => {
      const { scrollY, innerHeight } = window;
      const docHeight = document.documentElement.scrollHeight;

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

    const onScroll = () => {
      if (lockedRef.current) {
        // Once the page has settled after a nav click, watch for the user
        // manually scrolling away before releasing the lock.
        if (settledScrollY.current === null) {
          settledScrollY.current = window.scrollY;
        } else if (Math.abs(window.scrollY - settledScrollY.current) > 40) {
          lockedRef.current = false;
          settledScrollY.current = null;
          detect();
        }
        return;
      }
      detect();
    };

    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!ids.includes(hash)) return;
      lockedRef.current = true;
      settledScrollY.current = null;
      setActive(hash);
    };

    detect();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [ids, offset]);

  return active;
}
