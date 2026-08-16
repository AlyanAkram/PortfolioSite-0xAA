// Shared design tokens + Panel primitive for the "Standard" (basic) experience.
// Technical-blueprint identity: deep navy ground, fine cyan grid linework,
// amber annotation accent, corner registration marks on framed panels.

export const INK = {
  bg: "#0a1830",
  bgAlt: "#0d1f3d",
  panel: "#0f2544",
  line: "rgba(148,197,255,0.14)",
  lineStrong: "rgba(148,197,255,0.28)",
  paper: "#eef3f8",
  paperDim: "rgba(238,243,248,0.62)",
  paperFaint: "rgba(238,243,248,0.38)",
  amber: "#ffb020",
  cyan: "#5ec8ff",
};

export const DISPLAY = "'Space Grotesk', sans-serif";
export const BODY = "'Inter', sans-serif";
export const MONO = "'JetBrains Mono', monospace";

// Corner registration mark — the visual signature of this theme.
function CornerMark({ pos }) {
  const base = { position: "absolute", width: 14, height: 14 };
  const styles = {
    tl: {
      ...base,
      top: -1,
      left: -1,
      borderTop: `1.5px solid ${INK.amber}`,
      borderLeft: `1.5px solid ${INK.amber}`,
    },
    tr: {
      ...base,
      top: -1,
      right: -1,
      borderTop: `1.5px solid ${INK.amber}`,
      borderRight: `1.5px solid ${INK.amber}`,
    },
    bl: {
      ...base,
      bottom: -1,
      left: -1,
      borderBottom: `1.5px solid ${INK.amber}`,
      borderLeft: `1.5px solid ${INK.amber}`,
    },
    br: {
      ...base,
      bottom: -1,
      right: -1,
      borderBottom: `1.5px solid ${INK.amber}`,
      borderRight: `1.5px solid ${INK.amber}`,
    },
  };
  return <span style={{ ...styles[pos], pointerEvents: "none" }} />;
}

// Framed panel: thin cyan border + amber corner ticks. The recurring
// "instrument panel" motif used across the Standard experience.
export function Panel({ children, className = "", style = {}, marks = true }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        border: `1px solid ${INK.line}`,
        background: "rgba(255,255,255,0.015)",
        ...style,
      }}
    >
      {marks && (
        <>
          <CornerMark pos="tl" />
          <CornerMark pos="tr" />
          <CornerMark pos="bl" />
          <CornerMark pos="br" />
        </>
      )}
      {children}
    </div>
  );
}

// Small mono "SEC. 0N — LABEL" eyebrow used above each section heading.
export function SectionEyebrow({ index, children }) {
  return (
    <p
      className="text-[11px] tracking-[3px] uppercase mb-3 flex items-center gap-2"
      style={{ color: INK.cyan, fontFamily: MONO }}
    >
      <span style={{ color: INK.amber }}>{index}</span>
      <span style={{ width: 18, height: 1, background: INK.lineStrong }} />
      {children}
    </p>
  );
}

// Fine blueprint grid background, used behind the hero.
export function GridBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(${INK.line} 1px, transparent 1px), linear-gradient(90deg, ${INK.line} 1px, transparent 1px)`,
        backgroundSize: "36px 36px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
      }}
    />
  );
}
