import { ABOUT } from "../../data/profileData";
import { INK, DISPLAY, BODY, MONO, SectionEyebrow } from "./tokens";

export default function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-10 py-16 md:py-24 max-w-[1100px] mx-auto scroll-mt-20"
    >
      <div className="grid md:grid-cols-[260px_1fr] gap-10 md:gap-16">
        <div>
          <SectionEyebrow index="01">About</SectionEyebrow>
          <h2
            className="text-[26px] md:text-[30px] leading-[1.2]"
            style={{ fontFamily: DISPLAY, color: INK.paper, fontWeight: 600 }}
          >
            {ABOUT.headline}
          </h2>
        </div>

        <div>
          {ABOUT.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[15.5px] md:text-[16px] leading-[1.85] mb-5 max-w-[640px]"
              style={{ color: INK.paperDim, fontFamily: BODY }}
            >
              {p}
            </p>
          ))}

          <div className="flex flex-wrap gap-2 mt-7">
            {ABOUT.stack.map((s) => (
              <span
                key={s}
                className="text-[11px] px-2.5 py-1"
                style={{
                  fontFamily: MONO,
                  color: INK.cyan,
                  border: `1px solid ${INK.line}`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
