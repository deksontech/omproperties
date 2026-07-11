import { memo } from 'react'
import { trustBadges } from '../../constants/publicContent'

export const TrustBadges = memo(function TrustBadges({ compact = false }) {
  return (
    <div className={compact ? 'public-trust-badges compact' : 'public-trust-badges'}>
      {trustBadges.map(([label, Icon]) => (
        <span key={label}>
          <Icon size={15} /> {label}
        </span>
      ))}
    </div>
  )
})
