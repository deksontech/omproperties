import { valueCards } from '../homeContent'
import { LuxurySection } from './LuxurySection'

export function WhyChooseUs() {
  return (
    <LuxurySection eyebrow="Why OMProperties" title="A refined advisory experience from search to handover">
      <div className="luxury-value-grid">
        {valueCards.map(([title, text, Icon]) => (
          <article className="luxury-value-card" key={title}>
            <Icon size={28} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </LuxurySection>
  )
}
