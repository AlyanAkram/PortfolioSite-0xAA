import { PROFILE } from "../../data/profileData";
import { INK, MONO, BODY } from "./tokens";

const NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ onExit }) {
  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-10 py-4"
      style={{
        background: "rgba(10,24,48,0.82)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${INK.line}`,
      }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 flex items-center justify-center text-[12px] font-bold"
          style={{
            border: `1.5px solid ${INK.amber}`,
            color: INK.amber,
            fontFamily: MONO,
          }}
        >
          AA
        </div>
        <span
          className="text-[13px] tracking-[2px]"
          style={{ color: INK.paper, fontFamily: MONO }}
        >
          {PROFILE.handle}
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {NAV.map((n, i) => (
          <button
            key={n.id}
            onClick={() => scrollTo(n.id)}
            className="text-[13px] tracking-wide bg-transparent border-none cursor-pointer transition-colors flex items-center gap-1.5"
            style={{ color: INK.paperDim, fontFamily: BODY }}
            onMouseEnter={(e) => (e.currentTarget.style.color = INK.paper)}
            onMouseLeave={(e) => (e.currentTarget.style.color = INK.paperDim)}
          >
            <span style={{ color: INK.cyan, fontFamily: MONO, fontSize: 10 }}>
              0{i + 1}
            </span>
            {n.label}
          </button>
        ))}
      </nav>

      <button
        onClick={onExit}
        className="text-[11px] tracking-[1.5px] uppercase px-3 py-2 cursor-pointer"
        style={{
          color: INK.paperDim,
          border: `1px solid ${INK.line}`,
          fontFamily: MONO,
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = INK.amber;
          e.currentTarget.style.borderColor = INK.amber;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = INK.paperDim;
          e.currentTarget.style.borderColor = INK.line;
        }}
      >
        ← Profiles
      </button>
    </header>
  );
}
