import { useCallback, useEffect, useState } from 'react'
import { Inbox, Trash2 } from 'lucide-react'
import { useSeo } from '../../hooks/useSeo'
import { AdminLayout } from '../../layouts/AdminLayout'
import { LEAD_STATUSES, leadService } from '../../services/leadService'
import './LeadsPage.css'

const formatLeadDate = (value) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))

const getLeadSubject = (lead) => lead.propertyName || lead.serviceName || 'General Enquiry'
const getLeadMessage = (lead) => {
  const visitDetails = [lead.preferredDate, lead.preferredTime, lead.visitors ? `${lead.visitors} visitor(s)` : '']
    .filter(Boolean)
    .join(' / ')

  return visitDetails ? `${lead.message} (${visitDetails})` : lead.message
}

export function LeadsPage() {
  const [leads, setLeads] = useState([])

  useSeo({
    title: 'Admin Leads | OMProperties',
    description: 'View and manage OMProperties enquiry leads.',
  })

  useEffect(() => {
    leadService.getLeads().then(setLeads)
  }, [])

  const updateStatus = useCallback((leadId, status) => {
    leadService.updateLeadStatus(leadId, status).then(setLeads)
  }, [])

  const deleteLead = useCallback((leadId) => {
    leadService.deleteLead(leadId).then(setLeads)
  }, [])

  return (
    <AdminLayout>
      <section className="leads-page">
        <div className="admin-topline">
          <div>
            <p className="eyebrow">Lead Management</p>
            <h1>Enquiries</h1>
          </div>
          <span>{leads.length} total leads</span>
        </div>

        {leads.length === 0 ? (
          <div className="leads-empty-state">
            <Inbox size={34} />
            <h2>No leads yet.</h2>
            <p>Submitted property, turnkey, and contact enquiries will appear here.</p>
          </div>
        ) : (
          <div className="leads-table">
            <div className="leads-table-head">
              <span>Name</span>
              <span>Contact</span>
              <span>Source</span>
              <span>Property / Service</span>
              <span>Date</span>
              <span>Message</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {leads.map((lead) => (
              <article className="lead-row" key={lead.id}>
                <strong>{lead.name}</strong>
                <div>
                  <span>{lead.phone}</span>
                  <span>{lead.email}</span>
                </div>
                <span>{lead.source}</span>
                <span>{getLeadSubject(lead)}</span>
                <time dateTime={lead.createdAt}>{formatLeadDate(lead.createdAt)}</time>
                <p>{getLeadMessage(lead)}</p>
                <select value={lead.status} onChange={(event) => updateStatus(lead.id, event.target.value)}>
                  {LEAD_STATUSES.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
                <button className="icon-button" type="button" aria-label={`Delete lead from ${lead.name}`} onClick={() => deleteLead(lead.id)}>
                  <Trash2 size={17} />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </AdminLayout>
  )
}
