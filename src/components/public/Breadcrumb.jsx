import { memo } from 'react'
import { Link } from 'react-router-dom'

export const Breadcrumb = memo(function Breadcrumb({ items }) {
  return (
    <nav className="public-breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <strong>{item.label}</strong>}
        </span>
      ))}
    </nav>
  )
})
