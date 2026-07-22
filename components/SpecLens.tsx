"use client";

import { useEffect, useState } from "react";

/* Spec lens — the drafting layer under the hero's paper: grid columns,
   baselines, redline boxes and dimension rules around each hero frame,
   revealed through a soft circle that follows the cursor.
   Desktop (L/XL) + hover-capable pointers only; CSS hides it below 1200px.
   Port of the mockup's main.js lens IIFE. */

const FRAMES = [
  { name: "Eyebrow", key: "eye", selector: ".hero-eyebrow", wAbove: true },
  { name: "Headline", key: "title", selector: ".hero-title", wAbove: false },
  { name: "Subheader", key: "lede", selector: ".hero-lede", wAbove: false },
] as const;

export default function SpecLens() {
  // touch devices never see the lens — skip the build + pointer tracking
  const [enabled, setEnabled] = useState(false);
  const [layerEl, setLayerEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!layerEl) return;
    const layer = layerEl;
    const hero = layer.closest<HTMLElement>(".hero");
    if (!hero) return;

    const q = <T extends HTMLElement>(s: string) => layer.querySelector<T>(s);

    const place = () => {
      // boxes snap horizontally to the column grid and share one width
      // (the widest ink block); each frame carries a width rule below
      // and a height rule to its right, with live values.
      const IY = 8, GAP = 14;
      const hr = hero.getBoundingClientRect();

      // clip the lens to end at the top of the rolling stats bar so the
      // reveal circle never spills over the marquee
      const marquee = hero.querySelector(".marquee");
      layer.style.bottom = marquee
        ? `${Math.max(0, hr.bottom - marquee.getBoundingClientRect().top)}px`
        : "0px";

      const lines: number[] = [];
      layer.querySelectorAll(".lens-cols i").forEach((b) => {
        const r = b.getBoundingClientRect();
        lines.push(r.left - hr.left, r.right - hr.left);
      });
      lines.sort((a, b) => a - b);
      const snapL = (x: number) => { let v = lines[0]; for (const l of lines) if (l <= x + 1) v = l; return v; };
      const snapR = (x: number) => { for (const l of lines) if (l >= x - 1) return l; return lines[lines.length - 1]; };

      const refEl = hero.querySelector(".hero-lede") || hero.querySelector(".hero-title");
      if (!refEl) return;
      const rr = refEl.getBoundingClientRect();
      const SX = snapL(rr.left - hr.left);
      const SW = snapR(rr.right - hr.left) - SX;
      const TAGX = SX + SW + GAP + 28; // shared left edge for every frame name

      FRAMES.forEach((f) => {
        const el = hero.querySelector(f.selector);
        const box = q(`.lens-box[data-f="${f.key}"]`);
        const wdim = q(`.lens-dim[data-f="${f.key}"]`);
        const hdim = q(`.lens-vdim[data-f="${f.key}"]`);
        const tag = q(`.lens-tag[data-f="${f.key}"]`);
        const valW = q(`.lens-val-w[data-f="${f.key}"]`);
        const valH = q(`.lens-val-v[data-f="${f.key}"]`);
        if (!el || !box || !wdim || !hdim) return;

        const r = el.getBoundingClientRect();
        const y = r.top - hr.top - IY;
        const h = r.height + IY * 2;
        box.style.left = `${SX}px`;
        box.style.top = `${y}px`;
        box.style.width = `${SW}px`;
        box.style.height = `${h}px`;
        // width rule below (or above for the tight top frame)
        const wy = f.wAbove ? y - GAP : y + h + GAP;
        wdim.style.left = `${SX}px`;
        wdim.style.top = `${wy}px`;
        wdim.style.width = `${SW}px`;
        // height rule to the right
        hdim.style.left = `${SX + SW + GAP}px`;
        hdim.style.top = `${y}px`;
        hdim.style.height = `${h}px`;
        if (tag && valW && valH) {
          tag.style.left = `${TAGX}px`;
          tag.style.top = `${y - 1}px`;
          valW.textContent = `${Math.round(SW)}`;
          valW.style.left = `${SX + SW / 2}px`;
          valW.style.top = `${wy}px`;
          valH.textContent = `${Math.round(h)}`;
          valH.style.left = `${SX + SW + GAP}px`;
          valH.style.top = `${y + h / 2}px`;
        }
      });
    };

    place();
    if (document.fonts?.ready) document.fonts.ready.then(place);
    let placeT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(placeT);
      placeT = setTimeout(place, 150);
    };
    window.addEventListener("resize", onResize);

    const onMove = (e: PointerEvent) => {
      const hr = hero.getBoundingClientRect();
      layer.style.setProperty("--mx", `${e.clientX - hr.left}px`);
      layer.style.setProperty("--my", `${e.clientY - hr.top}px`);
      layer.classList.add("on");
    };
    const onLeave = () => layer.classList.remove("on");
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);

    return () => {
      clearTimeout(placeT);
      window.removeEventListener("resize", onResize);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, [layerEl]);

  if (!enabled) return null;

  return (
    <div className="spec-lens" aria-hidden="true" ref={setLayerEl}>
      <div className="lens-baselines" />
      <div className="wrap lens-cols">
        {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
      </div>
      {FRAMES.map((f) => (
        <span key={f.key}>
          <span className="lens-box" data-f={f.key} style={{ display: "block" }} />
          <span className="lens-dim" data-f={f.key} style={{ display: "block" }} />
          <span className="lens-vdim" data-f={f.key} style={{ display: "block" }} />
          <span className="lens-tag mono" data-f={f.key}>{f.name}</span>
          <span className="lens-val lens-val-w mono" data-f={f.key} />
          <span className="lens-val lens-val-v mono" data-f={f.key} />
        </span>
      ))}
      <div className="lens-stamp" aria-hidden="true">
        <svg viewBox="0 0 160 160">
          <defs>
            <path id="lensStampCircle" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
          </defs>
          <text className="lens-stamp-text">
            <textPath href="#lensStampCircle">HUMAN-DESIGNED ✳ AI-ASSISTED ✳ </textPath>
          </text>
          <path
            className="lens-stamp-glyph"
            transform="translate(80 80) scale(0.72) translate(-80 -80)"
            d="M80 56v48M59 68l42 24M101 68L59 92"
          />
        </svg>
      </div>
    </div>
  );
}
