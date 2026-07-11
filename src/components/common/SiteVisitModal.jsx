import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { SiteVisitForm } from './SiteVisitForm'

export function SiteVisitModal({ isOpen, onClose, propertyName = '', sourcePage = '' }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="site-visit-overlay" role="presentation">
      <div className="site-visit-modal" role="dialog" aria-modal="true" aria-labelledby="site-visit-title">
        <button ref={closeButtonRef} className="site-visit-close" type="button" aria-label="Close site visit form" onClick={onClose}>
          <X size={20} />
        </button>
        <p className="eyebrow">Site Visit Request</p>
        <h2 id="site-visit-title">Schedule a guided site visit</h2>
        <p>Share your preferred date and time. OMProperties will coordinate the visit and advisor support.</p>
        <SiteVisitForm propertyName={propertyName} sourcePage={sourcePage} />
      </div>
    </div>
  )
}
