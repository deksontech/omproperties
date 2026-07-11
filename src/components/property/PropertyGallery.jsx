import { useCallback, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ImageOff, Maximize2 } from 'lucide-react'
import { FullscreenGallery } from './FullscreenGallery'
import './PropertyGallery.css'

export function PropertyGallery({ images = [], title }) {
  const galleryImages = useMemo(() => images.filter(Boolean), [images])
  const [activeIndex, setActiveIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const hasMultipleImages = galleryImages.length > 1

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
  }, [galleryImages.length])

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1))
  }, [galleryImages.length])

  if (!galleryImages.length) {
    return (
      <section className="property-gallery-empty">
        <ImageOff size={34} />
        <p>Property images will be available soon.</p>
      </section>
    )
  }

  return (
    <section className="property-gallery" aria-label={`${title} image gallery`}>
      <div className="property-gallery__main">
        <button type="button" onClick={() => setFullscreen(true)} aria-label="Open fullscreen gallery">
          <img src={galleryImages[activeIndex]} alt={`${title} view ${activeIndex + 1}`} />
          <span>
            <Maximize2 size={16} /> View Gallery
          </span>
        </button>
        {hasMultipleImages && (
          <>
            <button className="property-gallery__control previous" type="button" onClick={showPrevious} aria-label="Previous image">
              <ChevronLeft size={22} />
            </button>
            <button className="property-gallery__control next" type="button" onClick={showNext} aria-label="Next image">
              <ChevronRight size={22} />
            </button>
            <strong>{activeIndex + 1} / {galleryImages.length}</strong>
          </>
        )}
      </div>
      {hasMultipleImages && (
        <div className="property-gallery__thumbs">
          {galleryImages.map((image, index) => (
            <button
              className={activeIndex === index ? 'active' : ''}
              type="button"
              key={image}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
            >
              <img src={image} alt={`${title} thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
      {fullscreen && (
        <FullscreenGallery
          images={galleryImages}
          index={activeIndex}
          title={title}
          onClose={() => setFullscreen(false)}
          onNext={showNext}
          onPrevious={showPrevious}
        />
      )}
    </section>
  )
}
