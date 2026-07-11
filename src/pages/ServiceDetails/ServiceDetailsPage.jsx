import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EnquiryForm } from '../../components/common/EnquiryForm'
import { Breadcrumb } from '../../components/public/Breadcrumb'
import { EmptyState } from '../../components/public/EmptyState'
import { PageHero } from '../../components/public/PageHero'
import { SiteVisitButton } from '../../components/public/SiteVisitButton'
import { TrustBadges } from '../../components/public/TrustBadges'
import { ServiceDetailContent } from '../../components/turnkey/ServiceDetailContent'
import { CTAButtons } from '../../components/ui/CTAButtons'
import { useSeo } from '../../hooks/useSeo'
import { useTurnkey } from '../../hooks/useTurnkey'

export function ServiceDetailsPage() {
  const { slug } = useParams()
  const { error, loading, services } = useTurnkey()
  const service = useMemo(
    () => services.find((item) => item.slug === slug),
    [services, slug],
  )

  useSeo({
    title: service ? `${service.title} Turnkey Service | OMProperties` : 'Service not found | OMProperties',
    description: service?.summary || 'The requested OMProperties turnkey service could not be found.',
  })

  if (loading) {
    return (
      <div className="public-page">
        <section className="public-section">
          <EmptyState title="Loading service..." message="Please wait while we prepare the turnkey service details." />
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="public-page">
        <section className="public-section">
          <EmptyState title="Unable to load service." message={error} />
        </section>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="public-page">
        <section className="public-section">
          <EmptyState
            title="Service not found."
            message="The service you are looking for may have been removed or the link may be incorrect."
            action={<Link className="button primary" to="/turnkey">Browse Turnkey Services</Link>}
          />
        </section>
      </div>
    )
  }

  return (
    <div className="public-page">
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Turnkey', to: '/turnkey' },
          { label: service.title },
        ]}
      />
      <PageHero
        eyebrow={service.category}
        title={service.title}
        subtitle={service.summary}
        image={service.hero}
      />
      <section className="detail-layout service-detail-layout">
        <ServiceDetailContent service={service} />
        <aside className="sticky-panel">
          <TrustBadges compact />
          <EnquiryForm
            serviceName={service.title}
            source="Turnkey Service Page"
            sourcePage={`/turnkey/${service.slug}`}
            title={`${service.title} Enquiry`}
          />
          <SiteVisitButton serviceName={service.title} className="button dark" label="Schedule Project Visit" />
          <CTAButtons subject={`${service.title} turnkey service`} />
        </aside>
      </section>
    </div>
  )
}
