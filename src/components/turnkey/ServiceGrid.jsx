import { memo } from 'react'
import { ServiceCard } from './ServiceCard'

export const ServiceGrid = memo(function ServiceGrid({ services }) {
  return (
    <div className="service-grid">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
})
