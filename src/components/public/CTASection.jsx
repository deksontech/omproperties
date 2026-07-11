import { memo } from 'react'

export const CTASection = memo(function CTASection({ eyebrow, title, text, image, children }) {
  return (
    <section className="public-cta-section">
      {image && <img src={image} alt="" aria-hidden="true" />}
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
        {children && <div className="public-cta-actions">{children}</div>}
      </div>
    </section>
  )
})
