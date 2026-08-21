import { CONTACT } from "../../data/profileData";
import { INK, DISPLAY, BODY, MONO, SectionEyebrow } from "./tokens";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-10 py-16 md:py-28 max-w-[1100px] mx-auto scroll-mt-20"
    >
      <SectionEyebrow index="04">Contact</SectionEyebrow>
      <h2
        className="text-[30px] md:text-[40px] max-w-[640px] mb-6"
        style={{
          fontFamily: DISPLAY,
          color: INK.paper,
          fontWeight: 600,
          lineHeight: 1.15,
        }}
      >
        Let's build something.
      </h2>
      <p
        className="max-w-[540px] text-[15.5px] leading-[1.8] mb-10"
        style={{ color: INK.paperDim, fontFamily: BODY }}
      >
        {CONTACT.intro}
      </p>

      <div
        className="flex flex-col"
        style={{ maxWidth: 560, border: `1px solid ${INK.line}` }}
      >
        {CONTACT.links.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-5 py-4 no-underline transition-colors"
            style={{
              borderBottom:
                i < CONTACT.links.length - 1 ? `1px solid ${INK.line}` : "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(94,200,255,0.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span
              className="text-[10.5px] tracking-[2px] uppercase"
              style={{ color: INK.amber, fontFamily: MONO }}
            >
              {l.label}
            </span>
            <span
              className="text-[14.5px]"
              style={{ color: INK.paper, fontFamily: MONO }}
            >
              {l.text}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
