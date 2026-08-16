import { PromptLine, SectionTitle, Body, Divider, TagRow } from './primitives'
import { ABOUT } from '../../../data/profileData'

export default function About() {
  return (
    <>
      <PromptLine path="cat about.me" />
      <SectionTitle>ALYAN AKRAM</SectionTitle>
      {ABOUT.paragraphs.map((p, i) => <Body key={i}>{p}</Body>)}
      <Divider />
      <TagRow tags={ABOUT.stack} />
    </>
  )
}
