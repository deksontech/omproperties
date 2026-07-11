import { servicesBeyondProperty } from '../../../constants/publicContent'
import { LuxurySection } from './LuxurySection'

export function ServicesBeyondProperty() {
  return (
    <LuxurySection eyebrow="Services Beyond Property" title="A complete property advisory and turnkey execution partner">
      <div className="luxury-value-grid">
        {servicesBeyondProperty.map(([title, text, Icon]) => (
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
