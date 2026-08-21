// Shared terminal-styled UI atoms used across all window sections.

export const MONO = "'Share Tech Mono', monospace"
export const SANS = "'DM Sans', sans-serif"

export const PromptLine = ({ path }) => (
  <p className="text-[11px] mb-5 tracking-[0.5px]" style={{ color: '#1a5a1a', fontFamily: MONO }}>
    <span style={{ color: '#00c840' }}>alyan@0xAA</span><span style={{ color: '#1a5a1a' }}>:</span><span style={{ color: '#3a8aff' }}>~</span><span style={{ color: '#aaa' }}>$</span>{' '}
    <span style={{ color: '#ccc' }}>{path}</span>
  </p>
)

export const SectionTitle = ({ children }) => (
  <h2
    className="text-[13px] mb-5 tracking-[3px] uppercase"
    style={{
      color: '#00ff55',
      fontFamily: MONO,
      borderBottom: '1px solid rgba(0,255,85,0.1)',
      paddingBottom: '10px',
    }}
  >
    {children}
  </h2>
)

export const Body = ({ children }) => (
  <p className="text-[14px] leading-[1.85] mb-3.5" style={{ fontFamily: SANS, color: '#7ab87a', fontWeight: 400 }}>
    {children}
  </p>
)

export const Highlight = ({ children }) => (
  <span style={{ color: '#00e855', fontWeight: 600 }}>{children}</span>
)

export const Tag = ({ children }) => (
  <span
    className="text-[10px] px-2 py-0.5 rounded-sm tracking-[0.5px]"
    style={{
      fontFamily: MONO,
      color: '#00b838',
      border: '1px solid rgba(0,184,56,0.25)',
      background: 'rgba(0,184,56,0.06)',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
)

export const TagRow = ({ tags }) => (
  <div className="flex flex-wrap gap-1.5 mt-3">
    {tags.map(t => <Tag key={t}>{t}</Tag>)}
  </div>
)

export const Divider = () => (
  <div style={{ height: 1, background: 'rgba(0,200,64,0.07)', margin: '18px 0' }} />
)

export const ProjectCard = ({ title, subtitle, desc, tags, link }) => (
  <div
    className="rounded p-4 mb-3 transition-all duration-200 cursor-default"
    style={{ border: '1px solid rgba(0,200,64,0.12)', background: 'rgba(0,200,64,0.025)' }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,200,64,0.3)'; e.currentTarget.style.background = 'rgba(0,200,64,0.05)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,200,64,0.12)'; e.currentTarget.style.background = 'rgba(0,200,64,0.025)' }}
  >
    <div className="flex items-start justify-between gap-2 mb-1">
      <div className="text-[12px] tracking-[0.8px]" style={{ fontFamily: MONO, color: '#00ff55' }}>
        ▸ {title}
      </div>
      {link && (
        <a href={link} target="_blank" rel="noreferrer"
          className="text-[10px] tracking-[0.5px] no-underline flex-shrink-0"
          style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.4)', border: '1px solid rgba(0,200,64,0.15)', padding: '1px 6px', borderRadius: 2 }}
          onMouseEnter={e => e.currentTarget.style.color = '#00c840'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,200,64,0.4)'}
        >↗ visit</a>
      )}
    </div>
    {subtitle && (
      <div className="text-[10px] mb-2 tracking-[0.5px]" style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.4)' }}>
        {subtitle}
      </div>
    )}
    <div className="text-[13px] leading-[1.65]" style={{ fontFamily: SANS, color: '#5a8a5a' }}>{desc}</div>
    <TagRow tags={tags} />
  </div>
)

export const SkillSection = ({ label, tags }) => (
  <div className="mb-5">
    <p className="text-[10px] mb-2.5 tracking-[2.5px]" style={{ color: 'rgba(0,255,85,0.5)', fontFamily: MONO }}>{label}</p>
    <TagRow tags={tags} />
  </div>
)

export const ContactLink = ({ label, text, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-3 py-3 no-underline group"
    style={{ borderBottom: '1px solid rgba(0,200,64,0.08)' }}
  >
    <span className="text-[10px] w-[70px] tracking-[1.5px] flex-shrink-0" style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.35)' }}>{label}</span>
    <span
      className="text-[13px] transition-colors duration-150"
      style={{ fontFamily: SANS, color: '#5a9a5a' }}
      onMouseEnter={e => e.currentTarget.style.color = '#00e855'}
      onMouseLeave={e => e.currentTarget.style.color = '#5a9a5a'}
    >
      {text}
    </span>
    <span className="ml-auto text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: MONO, color: 'rgba(0,200,64,0.4)' }}>↗</span>
  </a>
)
