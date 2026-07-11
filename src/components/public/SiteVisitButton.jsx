import { CalendarCheck } from 'lucide-react'
import { useSiteVisit } from '../../context/SiteVisitContext'

export function SiteVisitButton({ className = 'button primary', propertyName = '', serviceName = '', label = 'Schedule Site Visit' }) {
  const { openSiteVisit } = useSiteVisit()

  return (
    <button
      className={className}
      type="button"
      onClick={() => openSiteVisit({ propertyName, serviceName, sourcePage: window.location.pathname })}
    >
      <CalendarCheck size={18} /> {label}
    </button>
  )
}
