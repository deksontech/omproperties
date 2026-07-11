import { memo } from 'react'

export const SkeletonGrid = memo(function SkeletonGrid({ count = 6, type = 'card' }) {
  return (
    <div className={`skeleton-grid skeleton-grid--${type}`} aria-label="Loading content">
      {Array.from({ length: count }).map((_, index) => (
        <article className="skeleton-card" key={index}>
          <span className="skeleton-card__media" />
          <span className="skeleton-card__line short" />
          <span className="skeleton-card__line" />
          <span className="skeleton-card__line medium" />
          <span className="skeleton-card__actions" />
        </article>
      ))}
    </div>
  )
})
