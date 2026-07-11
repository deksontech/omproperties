import { memo } from 'react'
import { AmenitiesList } from '../common/AmenitiesList'
import { Gallery } from '../common/Gallery'

export const ServiceDetailContent = memo(function ServiceDetailContent({ service }) {
  return (
    <article className="detail-main">
      <h2>Overview</h2>
      <p>{service.description}</p>
      <h2>Features</h2>
      <AmenitiesList items={service.features} />
      <h2>Image Gallery</h2>
      <Gallery images={service.gallery} title={`${service.title} project`} className="service-gallery" />
    </article>
  )
})
