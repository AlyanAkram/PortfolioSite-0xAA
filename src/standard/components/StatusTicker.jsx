import { NOW_BUILDING } from "../../data/profileData";
import { INK, MONO } from "./tokens";

export default function StatusTicker() {
  const items = [...NOW_BUILDING, ...NOW_BUILDING]; // duplicate for seamless loop

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        borderTop: `1px solid ${INK.line}`,
        borderBottom: `1px solid ${INK.line}`,
        background: INK.bgAlt,
      }}
    >
      <div className="ticker-track flex items-center gap-10 py-3 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-[12px] flex items-center gap-2"
            style={{ fontFamily: MONO, color: INK.paperFaint }}
          >
            <span style={{ color: INK.amber }}>▸</span>
            LOG — {item}
          </span>
        ))}
      </div>

      <style>{`
        .ticker-track { width: max-content; animation: ticker-scroll 34s linear infinite; }
        @keyframes ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
      `}</style>
    </div>
  );
}
