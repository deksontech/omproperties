export function LuxurySection({ eyebrow, title, children }) {
  return (
    <section className="luxury-section fade-up">
      <div className="luxury-section__head">
        <p className="luxury-kicker">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}
