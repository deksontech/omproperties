import { memo } from 'react'

export const Gallery = memo(function Gallery({ images, title, className = '' }) {
  return (
    <section className={`gallery-grid ${className}`.trim()}>
      {images.map((image) => (
        <img key={image} src={image} alt={title} />
      ))}
    </section>
  )
})
