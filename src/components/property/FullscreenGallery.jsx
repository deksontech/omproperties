import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export function FullscreenGallery({ images, index, title, onClose, onNext, onPrevious }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrevious()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onNext, onPrevious])

  return (
    <div className="fullscreen-gallery" role="dialog" aria-modal="true" aria-label={`${title} fullscreen gallery`}>
      <button className="fullscreen-gallery__close" type="button" onClick={onClose} aria-label="Close gallery">
        <X size={24} />
      </button>
      {images.length > 1 && (
        <button className="fullscreen-gallery__previous" type="button" onClick={onPrevious} aria-label="Previous image">
          <ChevronLeft size={28} />
        </button>
      )}
      <img src={images[index]} alt={`${title} fullscreen view ${index + 1}`} />
      {images.length > 1 && (
        <button className="fullscreen-gallery__next" type="button" onClick={onNext} aria-label="Next image">
          <ChevronRight size={28} />
        </button>
      )}
      <span>{index + 1} / {images.length}</span>
    </div>
  )
}
