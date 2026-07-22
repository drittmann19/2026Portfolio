"use client";

import { useEffect, useRef } from "react";

/* Case-study video block — plays while in view, pauses when scrolled away. */
export default function CSVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="cs-img"
      src={src}
      controls
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
