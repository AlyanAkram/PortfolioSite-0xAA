import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "./data/profileData";

const INK = {
  bg: "#0a1830",
  line: "rgba(148,197,255,0.14)",
  paper: "#eef3f8",
  paperDim: "rgba(238,243,248,0.55)",
  cyan: "#5ec8ff",
};
const DISPLAY = "'Space Grotesk', sans-serif";
const MONO = "'JetBrains Mono', monospace";

const PROFILES = [
  {
    id: "standard",
    label: "Standard",
    caption: "Polished portfolio site",
    accent: "#ffb020",
    icon: "standard",
  },
  {
    id: "terminal",
    label: "Terminal",
    caption: "Boot sequence · retro OS desktop",
    accent: "#00c840",
    icon: "terminal",
  },
  {
    id: "arcade",
    label: "Arcade",
    caption: "Coming soon",
    accent: "#ff2ea6",
    icon: "arcade",
    locked: true,
  },
];

function Icon({ type, accent }) {
  if (type === "terminal") {
    return (
      <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
        <rect
          x="6"
          y="10"
          width="52"
          height="44"
          rx="3"
          fill={accent + "15"}
          stroke={accent}
          strokeWidth="1.5"
        />
        <path
          d="M16 24 L26 32 L16 40"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="30"
          y1="40"
          x2="46"
          y2="40"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "standard") {
    return (
      <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
        <rect
          x="6"
          y="6"
          width="52"
          height="52"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
        />
        <line x1="6" y1="6" x2="12" y2="6" stroke={accent} strokeWidth="2" />
        <line x1="6" y1="6" x2="6" y2="12" stroke={accent} strokeWidth="2" />
        <line x1="58" y1="58" x2="52" y2="58" stroke={accent} strokeWidth="2" />
        <line x1="58" y1="58" x2="58" y2="52" stroke={accent} strokeWidth="2" />
        <line
          x1="16"
          y1="24"
          x2="48"
          y2="24"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <line
          x1="16"
          y1="32"
          x2="40"
          y2="32"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <line
          x1="16"
          y1="40"
          x2="34"
          y2="40"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
      <circle
        cx="32"
        cy="20"
        r="7"
        fill={accent + "25"}
        stroke={accent}
        strokeWidth="1.5"
      />
      <line
        x1="32"
        y1="27"
        x2="32"
        y2="42"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="14"
        y="42"
        width="36"
        height="12"
        rx="3"
        fill={accent + "15"}
        stroke={accent}
        strokeWidth="1.5"
      />
      <circle cx="22" cy="48" r="2" fill={accent} />
      <circle cx="42" cy="48" r="2" fill={accent} />
    </svg>
  );
}

function LockBadge({ accent }) {
  return (
    <div
      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
      style={{ background: INK.bg, border: `1.5px solid ${accent}` }}
    >
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
        <rect
          x="5"
          y="10"
          width="14"
          height="10"
          rx="2"
          stroke={accent}
          strokeWidth="1.6"
        />
        <path
          d="M8 10V7a4 4 0 0 1 8 0v3"
          stroke={accent}
          strokeWidth="1.6"
          fill="none"
        />
      </svg>
    </div>
  );
}

// Falling-character rain, drawn on a canvas that only animates while the
// terminal card is hovered.
function MatrixRain({ active, accent, size }) {
  const canvasRef = useRef(null);
  const dropsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const fontSize = 13;
    const columns = Math.ceil(size / fontSize);
    if (dropsRef.current.length !== columns) {
      dropsRef.current = new Array(columns)
        .fill(0)
        .map(() => Math.random() * -20);
    }
    const chars = "01アイウエオカキクケコ0123456789$#+-<>".split("");

    let raf;
    function draw() {
      ctx.fillStyle = "rgba(10,24,48,0.18)";
      ctx.fillRect(0, 0, size, size);
      ctx.font = `${fontSize}px ${MONO}`;
      dropsRef.current.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const py = y * fontSize;
        ctx.fillStyle = py < fontSize * 1.5 ? "#d8ffe6" : accent;
        ctx.fillText(char, i * fontSize, py);
        if (py > size && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        } else {
          dropsRef.current[i] += 1;
        }
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active, accent, size]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full transition-opacity duration-200"
      style={{ opacity: active ? 0.9 : 0, width: size, height: size }}
    />
  );
}

function ProfileCard({ profile, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const boxSize = 196;

  return (
    <button
      onClick={() => onSelect(profile.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`ps-card-${profile.id} flex flex-col items-center gap-5 cursor-pointer bg-transparent border-none`}
      style={{ width: boxSize }}
    >
      <div className="relative">
        {/* soft pulse ring behind the terminal card */}
        {profile.id === "terminal" && (
          <div
            className="ps-pulse pointer-events-none absolute inset-0 rounded-none"
            style={{ border: `1.5px solid ${profile.accent}`, opacity: 0 }}
          />
        )}

        <div
          className="w-[160px] h-[160px] sm:w-[196px] sm:h-[196px] flex items-center justify-center transition-all duration-200 relative overflow-hidden"
          style={{
            background: hovered
              ? `${profile.accent}18`
              : "rgba(255,255,255,0.02)",
            border: `1.5px solid ${hovered ? profile.accent : INK.line}`,
            transform: hovered ? "translateY(-4px)" : "none",
          }}
        >
          {/* terminal: matrix rain fill */}
          {profile.id === "terminal" && (
            <MatrixRain
              active={hovered}
              accent={profile.accent}
              size={boxSize}
            />
          )}

          {/* standard: scanning light sweep */}
          {profile.id === "standard" && (
            <div
              className="ps-scan-bar pointer-events-none absolute left-0 w-full"
              style={{
                height: 26,
                background: `linear-gradient(180deg, transparent, ${profile.accent}55, transparent)`,
                opacity: 0,
              }}
            />
          )}

          {/* arcade: chromatic-aberration glitch layers */}
          {profile.id === "arcade" && (
            <>
              <div
                className="ps-glitch-r pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ opacity: 0, mixBlendMode: "screen" }}
              >
                <Icon type="arcade" accent="#ff2ea6" />
              </div>
              <div
                className="ps-glitch-c pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ opacity: 0, mixBlendMode: "screen" }}
              >
                <Icon type="arcade" accent="#4fffe0" />
              </div>
            </>
          )}

          {/* corner brackets for standard */}
          {profile.id === "standard" && (
            <>
              <span
                className="ps-corner pointer-events-none absolute top-1.5 left-1.5"
                style={{
                  width: 10,
                  height: 10,
                  borderTop: `2px solid ${profile.accent}`,
                  borderLeft: `2px solid ${profile.accent}`,
                }}
              />
              <span
                className="ps-corner pointer-events-none absolute bottom-1.5 right-1.5"
                style={{
                  width: 10,
                  height: 10,
                  borderBottom: `2px solid ${profile.accent}`,
                  borderRight: `2px solid ${profile.accent}`,
                }}
              />
            </>
          )}

          <span
            className={
              profile.id === "arcade" ? "ps-glitch-icon relative" : "relative"
            }
          >
            <Icon
              type={profile.icon}
              accent={hovered ? profile.accent : "rgba(238,243,248,0.45)"}
            />
          </span>
        </div>
        {profile.locked && <LockBadge accent={profile.accent} />}
      </div>

      <div className="text-center">
        <p
          className="text-[16px] sm:text-[17px] tracking-[1.5px] transition-colors duration-150"
          style={{
            fontFamily: MONO,
            fontWeight: 600,
            color: hovered ? INK.paper : INK.paperDim,
          }}
        >
          {profile.label}
        </p>
        <p
          className="text-[12px] mt-1"
          style={{ fontFamily: MONO, color: "rgba(238,243,248,0.4)" }}
        >
          {profile.caption}
        </p>
      </div>
    </button>
  );
}

export default function ProfileSelect() {
  const navigate = useNavigate();
  const onSelect = (id) => navigate(`/${id}`);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #0a2530 0%, #000000 100%)`,
      }}
    >
      <p
        className="relative text-[12px] sm:text-[13px] tracking-[4px] uppercase mb-3"
        style={{ fontFamily: MONO, color: INK.cyan }}
      >
        {PROFILE.name} · {PROFILE.handle}
      </p>

      <h1
        className="relative text-[34px] sm:text-[52px] mb-14 text-center leading-tight"
        style={{ fontFamily: DISPLAY, fontWeight: 700, color: INK.paper }}
      >
        Choose your experience
      </h1>

      <div className="relative flex flex-wrap items-start justify-center gap-10 sm:gap-20">
        {PROFILES.map((p) => (
          <ProfileCard key={p.id} profile={p} onSelect={onSelect} />
        ))}
      </div>

      <p
        className="relative mt-16 text-[12px] tracking-[1px]"
        style={{ fontFamily: MONO, color: "rgba(238,243,248,0.4)" }}
      >
        {PROFILE.role} — {PROFILE.location}
      </p>
    </div>
  );
}
