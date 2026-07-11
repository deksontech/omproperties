import { workSteps } from '../homeContent'
import { LuxurySection } from './LuxurySection'

export function HowWeWork() {
  return (
    <LuxurySection eyebrow="How We Work" title="A clear process designed for confident decisions">
      <div className="luxury-timeline">
        {workSteps.map(([step, Icon], index) => (
          <article className="luxury-timeline-step" key={step}>
            <div>
              <Icon size={24} />
            </div>
            <span>0{index + 1}</span>
            <h3>{step}</h3>
          </article>
        ))}
      </div>
    </LuxurySection>
  )
}
