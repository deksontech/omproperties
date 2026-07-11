import { useMemo, useState } from 'react'
import { Calculator } from 'lucide-react'
import { EnquiryForm } from '../../components/common/EnquiryForm'
import { PageHero } from '../../components/public/PageHero'
import { TURNKEY_HERO_IMAGE } from '../../constants/pageContent'
import {
  FINISH_LEVELS,
  PROJECT_TYPE_MULTIPLIERS,
  PROJECT_TYPES,
  TURNKEY_ESTIMATE_SERVICES,
  TURNKEY_PRICING,
} from '../../constants/turnkeyPricing'
import { useSeo } from '../../hooks/useSeo'
import './TurnkeyEstimatorPage.css'

const initialForm = {
  projectType: 'Flat',
  service: 'Full Turnkey',
  area: '1000',
  finish: 'Premium',
  location: '',
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0, style: 'currency', currency: 'INR' }).format(value)

export function TurnkeyEstimatorPage() {
  const [form, setForm] = useState(initialForm)
  const [showLeadForm, setShowLeadForm] = useState(false)

  useSeo({
    title: 'Turnkey Cost Estimator | OMProperties',
    description: 'Estimate turnkey project costs for interiors, electrical, exterior, carpentry, and full turnkey work.',
  })

  const estimate = useMemo(() => {
    const area = Math.max(0, Number(form.area) || 0)
    const baseRate = TURNKEY_PRICING[form.service][form.finish]
    const multiplier = PROJECT_TYPE_MULTIPLIERS[form.projectType]
    const midpoint = area * baseRate * multiplier
    return {
      low: midpoint * 0.88,
      high: midpoint * 1.18,
    }
  }, [form])

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  return (
    <div className="public-page turnkey-estimator-page">
      <PageHero
        eyebrow="Cost Estimator"
        title="Estimate your turnkey project budget"
        subtitle="Get an illustrative cost range for interiors, electrical, exterior, carpentry, or complete turnkey execution."
        image={TURNKEY_HERO_IMAGE}
      />
      <section className="public-section turnkey-estimator-layout">
        <form className="turnkey-estimator-form">
          <label>
            Project type
            <select name="projectType" value={form.projectType} onChange={updateForm}>
              {PROJECT_TYPES.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label>
            Service
            <select name="service" value={form.service} onChange={updateForm}>
              {TURNKEY_ESTIMATE_SERVICES.map((service) => <option key={service}>{service}</option>)}
            </select>
          </label>
          <label>
            Area in sq.ft.
            <input name="area" min="0" value={form.area} onChange={updateForm} type="number" />
          </label>
          <label>
            Finish level
            <select name="finish" value={form.finish} onChange={updateForm}>
              {FINISH_LEVELS.map((level) => <option key={level}>{level}</option>)}
            </select>
          </label>
          <label className="wide">
            City / location
            <input name="location" value={form.location} onChange={updateForm} placeholder="Project location" />
          </label>
        </form>
        <aside className="turnkey-estimate-result">
          <Calculator size={30} />
          <p className="eyebrow">Estimated Range</p>
          <h2>{formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}</h2>
          <p>Final pricing depends on site condition, material selection, design complexity, location, and scope of work.</p>
          <button className="public-button primary" type="button" onClick={() => setShowLeadForm((current) => !current)}>
            Request Detailed Quotation
          </button>
          {showLeadForm && (
            <EnquiryForm
              source="Turnkey Cost Estimate"
              sourcePage="/turnkey-cost-estimator"
              serviceName={`${form.service} - ${form.projectType}`}
              title="Quotation Request"
            />
          )}
        </aside>
      </section>
    </div>
  )
}
