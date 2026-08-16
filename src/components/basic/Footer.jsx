import { PROFILE } from "../../data/profileData";
import { INK, MONO } from "./tokens";

const FIELDS = [
  { label: "DWG", value: PROFILE.name.toUpperCase() },
  { label: "SHEET", value: "01 / 01" },
  { label: "REV", value: new Date().getFullYear().toString() },
  { label: "LOCATION", value: PROFILE.location },
];

export default function Footer({ onExit }) {
  return (
    <footer style={{ borderTop: `1px solid ${INK.line}` }}>
      <div
        className="px-6 md:px-10 py-6 grid grid-cols-2 md:grid-cols-4"
        style={{ borderBottom: `1px solid ${INK.line}` }}
      >
        {FIELDS.map((f, i) => (
          <div
            key={f.label}
            className="py-2"
            style={{
              borderLeft: i !== 0 ? `1px solid ${INK.line}` : "none",
              paddingLeft: i !== 0 ? 16 : 0,
            }}
          >
            <p
              className="text-[9.5px] tracking-[2px] mb-1"
              style={{ color: INK.cyan, fontFamily: MONO }}
            >
              {f.label}
            </p>
            <p
              className="text-[12px]"
              style={{ color: INK.paperDim, fontFamily: MONO }}
            >
              {f.value}
            </p>
          </div>
        ))}
      </div>
      <div className="px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span
          className="text-[11px]"
          style={{ color: INK.paperFaint, fontFamily: MONO }}
        >
          © {new Date().getFullYear()} {PROFILE.name} — built from scratch
        </span>
        <button
          onClick={onExit}
          className="text-[11px] tracking-[1.5px] uppercase bg-transparent border-none cursor-pointer"
          style={{ color: INK.paperDim, fontFamily: MONO }}
          onMouseEnter={(e) => (e.currentTarget.style.color = INK.amber)}
          onMouseLeave={(e) => (e.currentTarget.style.color = INK.paperDim)}
        >
          ← back to profiles
        </button>
      </div>
    </footer>
  );
}
