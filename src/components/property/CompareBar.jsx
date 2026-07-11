import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useProperties } from '../../hooks/useProperties'
import { usePropertyCompare } from '../../hooks/usePropertyCompare'

export function CompareBar() {
  const { properties } = useProperties()
  const { clearCompare, compareCount, compareIds, message, removeCompare } = usePropertyCompare()
  const selectedProperties = compareIds.map((id) => properties.find((property) => property.id === id)).filter(Boolean)

  if (compareCount === 0 && !message) {
    return null
  }

  return (
    <div className="compare-bar" role="status" aria-live="polite">
      <div>
        <strong>{compareCount} selected for comparison</strong>
        {message && <span>{message}</span>}
      </div>
      <div className="compare-bar__thumbs">
        {selectedProperties.map((property) => (
          <button type="button" key={property.id} onClick={() => removeCompare(property.id)} aria-label={`Remove ${property.title} from comparison`}>
            <img src={property.images[0]} alt="" />
            <X size={13} />
          </button>
        ))}
      </div>
      <Link className="public-button primary" to="/compare-properties">Compare</Link>
      <button className="public-button secondary" type="button" onClick={clearCompare}>Clear</button>
    </div>
  )
}
