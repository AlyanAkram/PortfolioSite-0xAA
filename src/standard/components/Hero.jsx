import { PROFILE } from "../../data/profileData";
import { INK, DISPLAY, BODY, MONO, GridBackdrop } from "./tokens";

const FACTS = [
  { label: "BASED", value: "Lahore, PK" },
  { label: "STATUS", value: "Available" },
  { label: "FOUNDER", value: "StealthWriter · Fenroe" },
];

export default function Hero() {
  return (
    <section className="relative px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      <GridBackdrop />

      <div className="relative max-w-[1100px] mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span
            className="text-[11px] tracking-[3px] uppercase px-2.5 py-1"
            style={{
              color: INK.amber,
              border: `1px solid ${INK.amber}`,
              fontFamily: MONO,
            }}
          >
            {PROFILE.role}
          </span>
        </div>

        <h1
          className="text-[13vw] md:text-[5vw] leading-[1.03] mb-9 max-w-[880px]"
          style={{
            fontFamily: DISPLAY,
            color: INK.paper,
            fontWeight: 600,
            letterSpacing: "-0.015em",
          }}
        >
          Full-stack engineer,
          <br />
          building things that <span style={{ color: INK.cyan }}>ship.</span>
        </h1>

        <p
          className="max-w-[560px] text-[16px] md:text-[17px] leading-[1.75] mb-10"
          style={{ color: INK.paperDim, fontFamily: BODY }}
        >
          {PROFILE.name} designs and ships AI-powered SaaS, full-stack web and
          mobile apps, and automation pipelines end-to-end — from system
          architecture to production deployment.
        </p>

        <div className="flex flex-wrap gap-4 mb-14">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 text-[13px] tracking-wide font-medium no-underline transition-opacity"
            style={{ background: INK.amber, color: INK.bg, fontFamily: BODY }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.85)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
          >
            View projects →
          </a>
          <a
            href={PROFILE.resume}
            download
            className="px-6 py-3 text-[13px] tracking-wide font-medium no-underline transition-colors"
            style={{
              color: INK.paper,
              border: `1px solid ${INK.line}`,
              fontFamily: BODY,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = INK.cyan)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = INK.line)}
          >
            Download résumé
          </a>
        </div>

        {/* Quick facts strip */}
        <div
          className="flex flex-wrap gap-x-10 gap-y-4"
          style={{ borderTop: `1px solid ${INK.line}`, paddingTop: 24 }}
        >
          {FACTS.map((f) => (
            <div key={f.label} className="flex items-baseline gap-2.5">
              <span
                className="text-[10px] tracking-[2px]"
                style={{ color: INK.cyan, fontFamily: MONO }}
              >
                {f.label}
              </span>
              <span
                className="text-[13px]"
                style={{ color: INK.paper, fontFamily: MONO }}
              >
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
