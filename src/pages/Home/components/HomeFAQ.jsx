import { ChevronDown } from 'lucide-react'
import { faqs } from '../homeContent'
import { LuxurySection } from './LuxurySection'

export function HomeFAQ({ openFaq, onToggleFaq }) {
  return (
    <LuxurySection eyebrow="Frequently Asked Questions" title="Everything important, answered before you begin">
      <div className="luxury-faq">
        {faqs.map(([question, answer], index) => (
          <article className={openFaq === index ? 'open' : ''} key={question}>
            <button type="button" onClick={() => onToggleFaq(index)}>
              {question}
              <ChevronDown size={20} />
            </button>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </LuxurySection>
  )
}
