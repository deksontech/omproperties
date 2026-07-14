import { Download } from 'lucide-react'
import { useState } from 'react'
import { leadService } from '../../services/leadService'

const initialForm = {
  name: '',
  phone: '',
  email: '',
}

export function BrochureLeadCapture({ brochureUrl, propertyName, sourcePage }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  if (!brochureUrl) {
    return null
  }

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setStatus('submitting')

    try {
      await leadService.createLead({
        ...form,
        message: `Requested brochure for ${propertyName}.`,
        propertyName,
        source: 'Brochure Download Request',
        sourcePage,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="brochure-capture success">
        <p className="form-status success">Brochure request captured. You can open the brochure now.</p>
        <a className="button muted" href={brochureUrl} target="_blank" rel="noreferrer">
          <Download size={16} /> Open Brochure
        </a>
      </div>
    )
  }

  return (
    <form className="brochure-capture" onSubmit={submitForm}>
      <div>
        <strong>Download brochure</strong>
        <span>Share your details to receive project information.</span>
      </div>
      <input name="name" value={form.name} onChange={updateForm} placeholder="Full name" aria-label="Full name" required />
      <input name="phone" value={form.phone} onChange={updateForm} placeholder="Phone number" aria-label="Phone number" required />
      <input name="email" value={form.email} onChange={updateForm} placeholder="Email address" aria-label="Email address" type="email" required />
      <button className="button muted" type="submit" disabled={status === 'submitting'}>
        <Download size={16} /> {status === 'submitting' ? 'Capturing...' : 'Get Brochure'}
      </button>
      {status === 'error' && <p className="form-status error">Unable to capture request. Please try again.</p>}
    </form>
  )
}
