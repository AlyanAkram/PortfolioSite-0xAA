import { SKILLS } from "../../data/profileData";
import { INK, DISPLAY, MONO, SectionEyebrow } from "./tokens";

export default function Skills() {
  return (
    <section
      id="skills"
      className="px-6 md:px-10 py-16 md:py-24 max-w-[1100px] mx-auto scroll-mt-20"
    >
      <SectionEyebrow index="03">Skills</SectionEyebrow>
      <h2
        className="text-[26px] md:text-[30px] mb-10"
        style={{ fontFamily: DISPLAY, color: INK.paper, fontWeight: 600 }}
      >
        Tools of the trade.
      </h2>

      <div
        className="grid sm:grid-cols-2 lg:grid-cols-4"
        style={{ border: `1px solid ${INK.line}` }}
      >
        {SKILLS.map((group, i) => (
          <div
            key={group.label}
            className="p-5"
            style={{
              borderRight: i % 4 !== 3 ? `1px solid ${INK.line}` : "none",
              borderBottom: i < 4 ? `1px solid ${INK.line}` : "none",
            }}
          >
            <p
              className="text-[10.5px] tracking-[2px] uppercase mb-3"
              style={{ color: INK.amber, fontFamily: MONO }}
            >
              {group.label}
            </p>
            <div className="flex flex-col gap-1.5">
              {group.tags.map((t) => (
                <span
                  key={t}
                  className="text-[13.5px]"
                  style={{ color: INK.paperDim, fontFamily: MONO }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
