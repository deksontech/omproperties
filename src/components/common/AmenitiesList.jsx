import { memo } from 'react'
import { Check } from 'lucide-react'

export const AmenitiesList = memo(function AmenitiesList({ items }) {
  return (
    <div className="amenities">
      {items.map((item) => (
        <span key={item}>
          <Check size={16} /> {item}
        </span>
      ))}
    </div>
  )
})
