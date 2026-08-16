import { useState } from "react";
import { PROFILE } from "../data/profileData";

const INK = {
  bg: "#0a1830",
  line: "rgba(148,197,255,0.14)",
  paper: "#eef3f8",
  paperDim: "rgba(238,243,248,0.5)",
  cyan: "#5ec8ff",
};
const DISPLAY = "'Space Grotesk', sans-serif";
const MONO = "'JetBrains Mono', monospace";

const PROFILES = [
  {
    id: "basic",
    label: "Standard",
    caption: "Polished portfolio site",
    accent: "#ffb020",
    icon: "basic",
  },
  {
    id: "terminal",
    label: "Terminal",
    caption: "Boot sequence · retro OS desktop",
    accent: "#00c840",
    icon: "terminal",
  },
  {
    id: "game",
    label: "Arcade",
    caption: "Coming soon",
    accent: "#ff2ea6",
    icon: "game",
    locked: true,
  },
];

function Icon({ type, accent }) {
  if (type === "terminal") {
    return (
      <svg viewBox="0 0 64 64" width="40" height="40" fill="none">
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
  if (type === "basic") {
    return (
      <svg viewBox="0 0 64 64" width="40" height="40" fill="none">
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
    <svg viewBox="0 0 64 64" width="40" height="40" fill="none">
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

function ProfileCard({ profile, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onSelect(profile.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-4 cursor-pointer bg-transparent border-none"
      style={{ width: 168 }}
    >
      <div className="relative">
        <div
          className="w-[140px] h-[140px] sm:w-[168px] sm:h-[168px] flex items-center justify-center transition-all duration-200"
          style={{
            background: hovered
              ? `${profile.accent}18`
              : "rgba(255,255,255,0.02)",
            border: `1.5px solid ${hovered ? profile.accent : INK.line}`,
            transform: hovered ? "translateY(-4px)" : "none",
          }}
        >
          <Icon
            type={profile.icon}
            accent={hovered ? profile.accent : "rgba(238,243,248,0.45)"}
          />
        </div>
        {profile.locked && <LockBadge accent={profile.accent} />}
      </div>

      <div className="text-center">
        <p
          className="text-[14px] tracking-[1.5px] transition-colors duration-150"
          style={{
            fontFamily: MONO,
            color: hovered ? INK.paper : INK.paperDim,
          }}
        >
          {profile.label}
        </p>
        <p
          className="text-[11px] mt-1"
          style={{ fontFamily: MONO, color: "rgba(238,243,248,0.32)" }}
        >
          {profile.caption}
        </p>
      </div>
    </button>
  );
}

export default function ProfileSelect({ onSelect }) {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: INK.bg }}
    >
      {/* blueprint grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${INK.line} 1px, transparent 1px), linear-gradient(90deg, ${INK.line} 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 40%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 40%, black 30%, transparent 90%)",
        }}
      />

      <p
        className="relative text-[11px] tracking-[4px] uppercase mb-3"
        style={{ fontFamily: MONO, color: INK.cyan }}
      >
        {PROFILE.name} · {PROFILE.handle}
      </p>

      <h1
        className="relative text-[26px] sm:text-[34px] mb-14 text-center"
        style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK.paper }}
      >
        Choose your experience
      </h1>

      <div className="relative flex flex-wrap items-start justify-center gap-8 sm:gap-14">
        {PROFILES.map((p) => (
          <ProfileCard key={p.id} profile={p} onSelect={onSelect} />
        ))}
      </div>

      <p
        className="relative mt-16 text-[11px] tracking-[1px]"
        style={{ fontFamily: MONO, color: "rgba(238,243,248,0.32)" }}
      >
        {PROFILE.role} — {PROFILE.location}
      </p>
    </div>
  );
}
