import { PromptLine, SectionTitle, SkillSection } from './primitives'
import { SKILLS } from '../../../data/profileData'

export default function Skills() {
  return (
    <>
      <PromptLine path="bash skills.sh" />
      <SectionTitle>SKILLS</SectionTitle>
      {SKILLS.map(s => (
        <SkillSection key={s.label} label={s.label} tags={s.tags} />
      ))}
    </>
  )
}
