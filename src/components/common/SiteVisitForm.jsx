import { useMemo, useState } from 'react'
import { leadService } from '../../services/leadService'

const timeSlots = ['9:00 AM-11:00 AM', '11:00 AM-1:00 PM', '2:00 PM-4:00 PM', '4:00 PM-6:00 PM']

const initialForm = {
  name: '',
  phone: '',
  email: '',
  preferredDate: '',
  preferredTime: timeSlots[0],
  visitors: '1',
  message: '',
}

const getToday = () => new Date().toISOString().split('T')[0]

export function SiteVisitForm({ propertyName = '', sourcePage = '', onSuccess }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const minDate = useMemo(getToday, [])

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setStatus('submitting')

    try {
      await leadService.createLead({
        ...form,
        propertyName,
        source: 'Site Visit Request',
        sourcePage,
        message: form.message || `Site visit requested for ${propertyName || 'OMProperties'}.`,
      })
      setForm(initialForm)
      setStatus('success')
      onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="site-visit-form" onSubmit={submitForm}>
      {propertyName && (
        <label>
          Property
          <input value={propertyName} readOnly />
        </label>
      )}
      <label>
        Name
        <input name="name" value={form.name} onChange={updateForm} required />
      </label>
      <label>
        Phone
        <input name="phone" value={form.phone} onChange={updateForm} required />
      </label>
      <label>
        Email
        <input name="email" value={form.email} onChange={updateForm} type="email" required />
      </label>
      <label>
        Preferred date
        <input name="preferredDate" value={form.preferredDate} min={minDate} onChange={updateForm} type="date" required />
      </label>
      <label>
        Preferred time
        <select name="preferredTime" value={form.preferredTime} onChange={updateForm}>
          {timeSlots.map((slot) => (
            <option key={slot}>{slot}</option>
          ))}
        </select>
      </label>
      <label>
        Visitors
        <input name="visitors" value={form.visitors} min="1" onChange={updateForm} type="number" required />
      </label>
      <label className="wide">
        Additional note
        <textarea name="message" value={form.message} onChange={updateForm} rows="4" />
      </label>
      <button className="button primary wide" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Scheduling...' : 'Schedule Site Visit'}
      </button>
      {status === 'success' && <p className="form-status success">Site visit request captured.</p>}
      {status === 'error' && <p className="form-status error">Something went wrong. Please try again.</p>}
    </form>
  )
}
