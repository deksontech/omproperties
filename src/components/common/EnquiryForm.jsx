import { memo, useState } from 'react'
import { leadService } from '../../services/leadService'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

export const EnquiryForm = memo(function EnquiryForm({
  propertyName = '',
  serviceName = '',
  source = 'Website Enquiry',
  sourcePage,
  title,
}) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

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
        serviceName,
        source,
        sourcePage,
      })
      setForm(initialForm)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submitForm}>
      <h3>{title}</h3>
      <input name="name" value={form.name} onChange={updateForm} placeholder="Full name" aria-label="Full name" required />
      <input name="phone" value={form.phone} onChange={updateForm} placeholder="Phone number" aria-label="Phone number" required />
      <input name="email" value={form.email} onChange={updateForm} placeholder="Email address" aria-label="Email address" type="email" required />
      <textarea name="message" value={form.message} onChange={updateForm} placeholder="Tell us what you need" aria-label="Message" rows="4" required />
      <button className="button primary" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Submit Enquiry'}
      </button>
      {status === 'success' && <p className="form-status success" role="status">Thank you. Your enquiry has been captured.</p>}
      {status === 'error' && <p className="form-status error" role="alert">Something went wrong. Please try again.</p>}
    </form>
  )
})
