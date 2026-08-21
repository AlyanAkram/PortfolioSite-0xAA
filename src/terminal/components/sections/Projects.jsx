import { PromptLine, SectionTitle, ProjectCard } from './primitives'
import { PROJECTS } from '../../../data/profileData'

export default function Projects() {
  return (
    <>
      <PromptLine path="ls -la projects/" />
      <SectionTitle>PROJECTS</SectionTitle>
      {PROJECTS.map(p => (
        <ProjectCard
          key={p.title}
          title={p.title}
          subtitle={p.subtitle}
          desc={p.desc}
          tags={p.tags}
          link={p.link}
        />
      ))}
    </>
  )
}
