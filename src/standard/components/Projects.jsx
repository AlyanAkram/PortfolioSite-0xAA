import { PROJECTS } from "../../data/profileData";
import { INK, DISPLAY, BODY, MONO, SectionEyebrow, Panel } from "./tokens";

function Featured({ project }) {
  return (
    <Panel className="p-7 md:p-10 mb-6" style={{ background: INK.bgAlt }}>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <span
            className="text-[10px] tracking-[2px]"
            style={{ fontFamily: MONO, color: INK.amber }}
          >
            FLAGSHIP PRODUCT
          </span>
          <h3
            className="text-[26px] md:text-[32px] mt-2"
            style={{ fontFamily: DISPLAY, color: INK.paper, fontWeight: 600 }}
          >
            {project.title}
          </h3>
          <p
            className="text-[13px] mt-1"
            style={{ fontFamily: MONO, color: INK.cyan }}
          >
            {project.subtitle}
          </p>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] no-underline px-3 py-2 flex-shrink-0"
            style={{ fontFamily: MONO, color: INK.bg, background: INK.cyan }}
          >
            ↗ Visit site
          </a>
        )}
      </div>
      <p
        className="text-[15px] leading-[1.8] mb-5 max-w-[680px]"
        style={{ color: INK.paperDim, fontFamily: BODY }}
      >
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="text-[10.5px] px-2 py-0.5"
            style={{
              fontFamily: MONO,
              color: INK.paperFaint,
              border: `1px solid ${INK.line}`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </Panel>
  );
}

function ProjectCard({ project }) {
  return (
    <div
      className="p-6 transition-colors duration-200"
      style={{ border: `1px solid ${INK.line}` }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = INK.cyan)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = INK.line)}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3
          className="text-[17px]"
          style={{ fontFamily: DISPLAY, color: INK.paper, fontWeight: 600 }}
        >
          {project.title}
        </h3>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] no-underline flex-shrink-0"
            style={{ fontFamily: MONO, color: INK.cyan }}
          >
            ↗
          </a>
        )}
      </div>
      <p
        className="text-[10.5px] mb-3 tracking-wide"
        style={{ fontFamily: MONO, color: INK.amber }}
      >
        {project.subtitle}
      </p>
      <p
        className="text-[13.5px] leading-[1.7] mb-4"
        style={{ color: INK.paperDim, fontFamily: BODY }}
      >
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5"
            style={{
              fontFamily: MONO,
              color: INK.paperFaint,
              border: `1px solid ${INK.line}`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [featured, ...rest] = PROJECTS;

  return (
    <section
      id="projects"
      className="px-6 md:px-10 py-16 md:py-24 max-w-[1100px] mx-auto scroll-mt-20"
    >
      <SectionEyebrow index="02">Projects</SectionEyebrow>
      <h2
        className="text-[26px] md:text-[30px] mb-10"
        style={{ fontFamily: DISPLAY, color: INK.paper, fontWeight: 600 }}
      >
        Things I've built.
      </h2>

      <Featured project={featured} />

      <div className="grid md:grid-cols-2 gap-5">
        {rest.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
