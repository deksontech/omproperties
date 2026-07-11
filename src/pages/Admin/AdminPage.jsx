import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, ExternalLink, Home, MessageSquareText, Plus, Wrench } from 'lucide-react'
import { SEO } from '../../constants/seo'
import { useProperties } from '../../hooks/useProperties'
import { useSeo } from '../../hooks/useSeo'
import { useTurnkey } from '../../hooks/useTurnkey'
import { AdminLayout } from '../../layouts/AdminLayout'
import { LEAD_STATUSES, leadService } from '../../services/leadService'
import { PROPERTY_STATUSES } from '../../services/propertyService'
import './AdminPage.css'

const formatDate = (value) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))

const countBy = (items, predicate) => items.filter(predicate).length

const getLeadSubject = (lead) => lead.propertyName || lead.serviceName || 'General Enquiry'

export function AdminPage() {
  const [leads, setLeads] = useState([])
  const { properties } = useProperties()
  const { services } = useTurnkey()

  useSeo(SEO.adminDashboard)

  useEffect(() => {
    leadService.getLeads().then(setLeads)
  }, [])

  const propertyCards = useMemo(
    () => [
      ['Total Properties', properties.length, Building2],
      ['Featured Properties', countBy(properties, (property) => property.featured), Home],
      ...PROPERTY_STATUSES.map((status) => [
        `${status} Properties`,
        countBy(properties, (property) => (property.status || 'Available') === status),
        Building2,
      ]),
    ],
    [properties],
  )

  const leadCards = useMemo(
    () => [
      ['Total Leads', leads.length, MessageSquareText],
      ...LEAD_STATUSES.map((status) => [
        `${status} Leads`,
        countBy(leads, (lead) => lead.status === status),
        MessageSquareText,
      ]),
    ],
    [leads],
  )

  const turnkeyCards = useMemo(
    () => [
      ['Total Turnkey Services', services.length, Wrench],
      ['Featured Turnkey Services', countBy(services, (service) => service.featured), Wrench],
    ],
    [services],
  )

  const recentLeads = useMemo(
    () => [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    [leads],
  )

  const recentProperties = useMemo(
    () => [...properties].slice(0, 5),
    [properties],
  )

  return (
    <AdminLayout>
      <section className="admin-dashboard-page">
        <div className="admin-topline">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Business Overview</h1>
          </div>
        </div>

        <div className="admin-quick-actions">
          <Link className="button primary" to="/admin/properties">
            <Plus size={16} /> Add Property
          </Link>
          <Link className="button dark" to="/admin/leads">
            View Leads <ArrowRight size={16} />
          </Link>
          <Link className="button primary" to="/admin/turnkey">
            <Plus size={16} /> Add Turnkey Service
          </Link>
          <Link className="button muted" to="/">
            Go to Website <ExternalLink size={16} />
          </Link>
        </div>

        <SummarySection title="Property Summary" cards={propertyCards} />
        <SummarySection title="Lead Summary" cards={leadCards} />
        <SummarySection title="Turnkey Summary" cards={turnkeyCards} />

        <section className="dashboard-split">
          <DashboardPanel title="Recent Leads" actionLabel="View All" actionTo="/admin/leads">
            {recentLeads.length === 0 ? (
              <p className="dashboard-empty">No leads captured yet.</p>
            ) : (
              <div className="dashboard-table">
                {recentLeads.map((lead) => (
                  <article key={lead.id}>
                    <strong>{lead.name}</strong>
                    <span>{getLeadSubject(lead)}</span>
                    <span>{lead.status}</span>
                    <time dateTime={lead.createdAt}>{formatDate(lead.createdAt)}</time>
                  </article>
                ))}
              </div>
            )}
          </DashboardPanel>

          <DashboardPanel title="Recent Properties" actionLabel="Manage" actionTo="/admin/properties">
            {recentProperties.length === 0 ? (
              <p className="dashboard-empty">No properties available.</p>
            ) : (
              <div className="dashboard-table">
                {recentProperties.map((property) => (
                  <article key={property.id}>
                    <strong>{property.title}</strong>
                    <span>{property.type}</span>
                    <span>{property.status || 'Available'}</span>
                    <span>{property.price}</span>
                  </article>
                ))}
              </div>
            )}
          </DashboardPanel>
        </section>

        <DashboardPanel title="Lead Status Breakdown" actionLabel="Open Leads" actionTo="/admin/leads">
          <div className="lead-breakdown">
            {LEAD_STATUSES.map((status) => {
              const value = countBy(leads, (lead) => lead.status === status)
              const percent = leads.length ? Math.round((value / leads.length) * 100) : 0

              return (
                <div key={status}>
                  <span>{status}</span>
                  <strong>{value}</strong>
                  <div>
                    <i style={{ width: `${percent}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </DashboardPanel>
      </section>
    </AdminLayout>
  )
}

function SummarySection({ cards, title }) {
  return (
    <section className="dashboard-section">
      <h2>{title}</h2>
      <div className="dashboard-card-grid">
        {cards.map(([label, value, Icon]) => (
          <article className="dashboard-summary-card" key={label}>
            <Icon size={24} />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

function DashboardPanel({ actionLabel, actionTo, children, title }) {
  return (
    <section className="dashboard-panel">
      <div>
        <h2>{title}</h2>
        <Link to={actionTo}>
          {actionLabel} <ArrowRight size={15} />
        </Link>
      </div>
      {children}
    </section>
  )
}
