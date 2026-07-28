"use client";

import { useEffect, useState } from "react";

/* Spec lens — the drafting layer under the hero's paper: grid columns,
   baselines, rulers, hatched margins, gutter callouts, and a redline
   box + dimension rules around each hero frame, revealed through a
   soft circle that follows the cursor.
   Desktop (L/XL) + hover-capable pointers only; CSS hides it below 1200px. */

const FRAMES = [
  { name: "Eyebrow", key: "eye", selector: ".hero-eyebrow", fam: "Spline Mono", wAbove: true },
  { name: "Headline", key: "title", selector: ".hero-title", fam: "Fraunces", wAbove: false },
  { name: "Subheader", key: "lede", selector: ".hero-lede", fam: "Archivo", wAbove: false },
] as const;

/* one gap measure between each pair of stacked frames */
const GAPS = FRAMES.slice(0, -1).map((_, i) => i);
const GUTTERS = [
  { cols: [2, 3], at: 0.16 },
  { cols: [8, 9], at: 0.8 },
];

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

    // "Fraunces · 123/0.96" — read off the live computed styles
    const specOf = (selector: string, fam: string) => {
      const el = hero.querySelector(selector);
      if (!el) return fam;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      const lh = parseFloat(cs.lineHeight) / fs;
      return Number.isFinite(lh) ? `${fam} · ${Math.round(fs)}/${lh.toFixed(2)}` : fam;
    };

    const place = () => {
      // boxes snap horizontally to the column grid and share one width
      // (the widest ink block); each frame carries a width rule below
      // and a height rule to its right, with live values.
      const IY = 8, GAP = 14;
      const hr = hero.getBoundingClientRect();

      // clip the lens to end at the top of the rolling stats bar so the
      // reveal circle never spills over the marquee
      const marquee = hero.querySelector(".marquee");
      const layerB = marquee ? Math.max(0, hr.bottom - marquee.getBoundingClientRect().top) : 0;
      layer.style.bottom = `${layerB}px`;

      const cols = layer.querySelectorAll<HTMLElement>(".lens-cols i");
      if (!cols.length) return;

      const lines: number[] = [];
      cols.forEach((b) => {
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
      const TAGX = SX + SW + GAP + 30; // shared left edge for every frame name

      const boxes: Array<{ y: number; h: number }> = [];

      FRAMES.forEach((f) => {
        const el = hero.querySelector(f.selector);
        const box = q(`.lens-box[data-f="${f.key}"]`);
        const wdim = q(`.lens-dim[data-f="${f.key}"]`);
        const hdim = q(`.lens-vdim[data-f="${f.key}"]`);
        const tag = q(`.lens-tag[data-f="${f.key}"]`);
        const spec = q(`.lens-spec[data-f="${f.key}"]`);
        const valW = q(`.lens-val-w[data-f="${f.key}"]`);
        const valH = q(`.lens-val-v[data-f="${f.key}"]`);
        if (!el || !box || !wdim || !hdim) return;

        const r = el.getBoundingClientRect();
        const y = r.top - hr.top - IY;
        const h = r.height + IY * 2;
        boxes.push({ y, h });

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
          if (spec) spec.textContent = specOf(f.selector, f.fam);
          valW.textContent = `${Math.round(SW)}`;
          valW.style.left = `${SX + SW / 2}px`;
          valW.style.top = `${wy}px`;
          valH.textContent = `${Math.round(h)}`;
          valH.style.left = `${SX + SW + GAP}px`;
          valH.style.top = `${y + h / 2}px`;
        }
      });

      // stack gaps between frames, measured on the left in ultramarine
      GAPS.forEach((i) => {
        const gdim = q(`.lens-vdim[data-g="${i}"]`);
        const gval = q(`.lens-val-g[data-g="${i}"]`);
        const a = boxes[i], b = boxes[i + 1];
        if (!gdim || !gval || !a || !b) return;
        const gy = a.y + a.h, gh = b.y - gy;
        const show = gh >= 14;
        gdim.style.display = show ? "block" : "none";
        gval.style.display = show ? "block" : "none";
        if (!show) return;
        const gx = SX - 26;
        gdim.style.left = `${gx}px`;
        gdim.style.top = `${gy}px`;
        gdim.style.height = `${gh}px`;
        gval.textContent = `${Math.round(gh)}`;
        gval.style.left = `${gx}px`;
        gval.style.top = `${gy + gh / 2}px`;
      });

      // hatched margins between the viewport edge and the content columns
      const contentL = cols[0].getBoundingClientRect().left - hr.left;
      const contentR = cols[cols.length - 1].getBoundingClientRect().right - hr.left;
      const mL = q(".rl-margin[data-side='l']");
      const mR = q(".rl-margin[data-side='r']");
      if (mL?.firstElementChild) {
        mL.style.left = "0px";
        mL.style.width = `${contentL}px`;
        mL.firstElementChild.textContent = `MARGIN · ${Math.round(contentL)}`;
      }
      if (mR?.firstElementChild) {
        mR.style.left = `${contentR}px`;
        mR.style.width = `${hr.width - contentR}px`;
        mR.firstElementChild.textContent = `MARGIN · ${Math.round(hr.width - contentR)}`;
      }

      // gutter callouts, dropped into two of the column gaps
      GUTTERS.forEach((g, i) => {
        const chip = q(`.rl-gutter[data-gut="${i}"]`);
        const a = cols[g.cols[0]], b = cols[g.cols[1]];
        if (!chip || !a || !b) return;
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        chip.textContent = `GUTTER ${Math.round(rb.left - ra.right)}`;
        chip.style.left = `${(ra.right + rb.left) / 2 - hr.left}px`;
        chip.style.top = `${g.at * hr.height}px`;
      });

      // rulers: a tick label every 100px
      const rt = q(".rl-ruler-top");
      if (rt) {
        rt.textContent = "";
        for (let x = 100; x < hr.width; x += 100) {
          const s = document.createElement("span");
          s.textContent = `${x}`;
          s.style.left = `${x}px`;
          rt.appendChild(s);
        }
      }
      const rl = q(".rl-ruler-left");
      if (rl) {
        rl.textContent = "";
        for (let y = 100; y < hr.height - layerB; y += 100) {
          const s = document.createElement("span");
          s.textContent = `${y}`;
          s.style.top = `${y}px`;
          rl.appendChild(s);
        }
      }
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

      <div className="rl-ruler-top" />
      <div className="rl-ruler-left" />
      <div className="rl-margin" data-side="l"><b className="mono" /></div>
      <div className="rl-margin" data-side="r"><b className="mono" /></div>
      {GUTTERS.map((_, i) => (
        <span className="rl-gutter mono" data-gut={i} key={`gut-${i}`} />
      ))}

      {FRAMES.map((f) => (
        <span key={f.key}>
          <span className="lens-box" data-f={f.key} style={{ display: "block" }}>
            {f.key === "title" && <span className="lens-pad-tag">pad-y 8</span>}
          </span>
          <span className="lens-dim" data-f={f.key} style={{ display: "block" }} />
          <span className="lens-vdim" data-f={f.key} style={{ display: "block" }} />
          <span className="lens-tag mono" data-f={f.key}>
            {f.name}
            <small className="lens-spec" data-f={f.key} />
          </span>
          <span className="lens-val lens-val-w mono" data-f={f.key} />
          <span className="lens-val lens-val-v mono" data-f={f.key} />
        </span>
      ))}

      {GAPS.map((i) => (
        <span key={`gap-${i}`}>
          <span className="lens-vdim is-gap" data-g={i} style={{ display: "block" }} />
          <span className="lens-val lens-val-v lens-val-g is-gap mono" data-g={i} />
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
