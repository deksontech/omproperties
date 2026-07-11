import { memo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

export const FAQSection = memo(function FAQSection({ eyebrow = 'FAQ', title = 'Frequently asked questions', faqs }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="public-section">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="public-faq-list">
        {faqs.map(([question, answer], index) => (
          <article className={openIndex === index ? 'public-faq-item open' : 'public-faq-item'} key={question}>
            <button type="button" onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}>
              <span>{question}</span>
              <ChevronDown size={20} />
            </button>
            {openIndex === index && <p>{answer}</p>}
          </article>
        ))}
      </div>
    </section>
  )
})
