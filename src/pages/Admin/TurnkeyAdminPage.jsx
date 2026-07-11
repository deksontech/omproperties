import { useMemo, useState } from 'react'
import { Edit3, Plus, Star, Trash2 } from 'lucide-react'
import { useSeo } from '../../hooks/useSeo'
import { useTurnkey } from '../../hooks/useTurnkey'
import { AdminLayout } from '../../layouts/AdminLayout'
import { TURNKEY_CATEGORIES, TURNKEY_STATUSES } from '../../services/turnkeyService'
import './TurnkeyAdminPage.css'

const emptyServiceForm = {
  title: '',
  slug: '',
  summary: '',
  description: '',
  category: 'Electrical',
  images: '',
  features: '',
  status: 'Active',
  featured: false,
}

const createSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const parseList = (value) =>
  value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)

const serviceToForm = (service) => ({
  title: service.title,
  slug: service.slug,
  summary: service.summary,
  description: service.description,
  category: service.category || service.title,
  images: [service.hero, ...service.gallery.filter((image) => image !== service.hero)].filter(Boolean).join('\n'),
  features: service.features.join('\n'),
  status: service.status || 'Active',
  featured: Boolean(service.featured),
})

const formToService = (form) => {
  const images = parseList(form.images)

  return {
    title: form.title,
    slug: createSlug(form.slug || form.title),
    summary: form.summary,
    description: form.description,
    category: form.category,
    hero: images[0] || '',
    gallery: images,
    features: parseList(form.features),
    status: form.status,
    featured: form.featured,
  }
}

export function TurnkeyAdminPage() {
  const [editingService, setEditingService] = useState(null)
  const [form, setForm] = useState(emptyServiceForm)
  const { deleteService, services, toggleFeaturedService, updateService, addService } = useTurnkey()

  useSeo({
    title: 'Admin Turnkey Services | OMProperties',
    description: 'Manage OMProperties turnkey project services.',
  })

  const sortedServices = useMemo(
    () => [...services].sort((a, b) => String(a.title).localeCompare(String(b.title))),
    [services],
  )

  const updateForm = (event) => {
    const { checked, name, type, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'title' && !editingService ? { slug: createSlug(value) } : {}),
    }))
  }

  const resetForm = () => {
    setEditingService(null)
    setForm(emptyServiceForm)
  }

  const editService = (service) => {
    setEditingService(service)
    setForm(serviceToForm(service))
  }

  const submitService = (event) => {
    event.preventDefault()
    const service = formToService(form)

    if (editingService) {
      updateService(editingService.id, service)
    } else {
      addService(service)
    }

    resetForm()
  }

  return (
    <AdminLayout>
      <section className="turnkey-admin-page">
        <div className="admin-topline">
          <div>
            <p className="eyebrow">Turnkey Management</p>
            <h1>Turnkey Services</h1>
          </div>
          <span>{services.length} services</span>
        </div>

        <form className="turnkey-admin-form" onSubmit={submitService}>
          <div className="turnkey-admin-form__head">
            <h2>{editingService ? 'Edit Service' : 'Add Service'}</h2>
            <button className="button muted" type="button" onClick={resetForm}>
              Clear
            </button>
          </div>

          <label>
            Title
            <input name="title" value={form.title} onChange={updateForm} required />
          </label>
          <label>
            Slug
            <input name="slug" value={form.slug} onChange={updateForm} required />
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={updateForm}>
              {TURNKEY_CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select name="status" value={form.status} onChange={updateForm}>
              {TURNKEY_STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label className="featured-control">
            <input name="featured" checked={form.featured} onChange={updateForm} type="checkbox" />
            Featured
          </label>
          <label className="wide">
            Short Description
            <textarea name="summary" value={form.summary} onChange={updateForm} rows="3" required />
          </label>
          <label className="wide">
            Full Description
            <textarea name="description" value={form.description} onChange={updateForm} rows="5" required />
          </label>
          <label>
            Image URLs
            <textarea name="images" value={form.images} onChange={updateForm} rows="6" placeholder="One per line or comma separated" required />
          </label>
          <label>
            Features
            <textarea name="features" value={form.features} onChange={updateForm} rows="6" placeholder="One per line or comma separated" />
          </label>
          <button className="button primary wide" type="submit">
            <Plus size={16} /> {editingService ? 'Update Service' : 'Add Service'}
          </button>
        </form>

        <div className="turnkey-admin-list">
          {sortedServices.map((service) => (
            <article className="turnkey-admin-row" key={service.id}>
              <img src={service.hero || service.gallery[0]} alt={service.title} />
              <div>
                <strong>{service.title}</strong>
                <span>{service.category} / {service.status || 'Active'}</span>
                <span>{service.summary}</span>
              </div>
              <button className={service.featured ? 'featured-toggle active' : 'featured-toggle'} type="button" onClick={() => toggleFeaturedService(service.id)}>
                <Star size={16} /> {service.featured ? 'Featured' : 'Feature'}
              </button>
              <button className="button muted" type="button" onClick={() => editService(service)}>
                <Edit3 size={16} /> Edit
              </button>
              <button className="button dark" type="button" onClick={() => deleteService(service.id)}>
                <Trash2 size={16} /> Delete
              </button>
            </article>
          ))}
        </div>
      </section>
    </AdminLayout>
  )
}
