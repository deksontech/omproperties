import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

const titleCase = (value) =>
  value
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export const PageHero = memo(function PageHero({ eyebrow, title, subtitle, image, children }) {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)
  const shouldShowBreadcrumb = segments.length > 0

  return (
    <section className="public-page-hero">
      {image && <img src={image} alt="" aria-hidden="true" />}
      <div>
        {shouldShowBreadcrumb && (
          <nav className="hero-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {segments.map((segment, index) => {
              const to = `/${segments.slice(0, index + 1).join('/')}`
              const isLast = index === segments.length - 1
              return isLast ? (
                <span key={to}>{titleCase(segment)}</span>
              ) : (
                <Link key={to} to={to}>{titleCase(segment)}</Link>
              )
            })}
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {children}
      </div>
    </section>
  )
})
