import { memo } from 'react'

export const SectionHeader = memo(function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="public-section-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
})
