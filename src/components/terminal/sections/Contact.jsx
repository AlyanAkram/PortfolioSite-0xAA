import { PromptLine, SectionTitle, Body, Highlight, Divider, ContactLink } from './primitives'
import { CONTACT } from '../../../data/profileData'

export default function Contact() {
  return (
    <>
      <PromptLine path="ls contact/" />
      <SectionTitle>CONTACT</SectionTitle>
      <Body>
        {CONTACT.intro.split('freelance work')[0]}
        <Highlight>freelance work</Highlight>
        {CONTACT.intro.split('freelance work')[1]}
      </Body>
      <Divider />
      <div className="mt-1">
        {CONTACT.links.map(l => (
          <ContactLink key={l.label} label={l.label} text={l.text} href={l.href} />
        ))}
      </div>
    </>
  )
}
