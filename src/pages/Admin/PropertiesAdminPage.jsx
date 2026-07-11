import { useMemo, useState } from 'react'
import { Edit3, Plus, Star, Trash2 } from 'lucide-react'
import { CATEGORY_OPTIONS, PROPERTY_TYPES, PURPOSES } from '../../constants/propertyOptions'
import { useProperties } from '../../hooks/useProperties'
import { useSeo } from '../../hooks/useSeo'
import { AdminLayout } from '../../layouts/AdminLayout'
import { PROPERTY_STATUSES } from '../../services/propertyService'
import './PropertiesAdminPage.css'

const emptyPropertyForm = {
  title: '',
  slug: '',
  purpose: 'Buy',
  type: 'Flats',
  category: 'Residential',
  price: '',
  location: '',
  bedrooms: '0',
  bathrooms: '0',
  area: '',
  description: '',
  amenities: '',
  images: '',
  brochureUrl: '',
  videoUrl: '',
  verified: true,
  reraNumber: '',
  latitude: '',
  longitude: '',
  nearbyPlaces: '',
  possessionStatus: '',
  furnishing: '',
  facing: '',
  floorNumber: '',
  totalFloors: '',
  parking: '',
  ageOfProperty: '',
  status: 'Available',
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

const propertyToForm = (property) => ({
  title: property.title,
  slug: property.slug,
  purpose: property.purpose,
  type: property.type,
  category: property.category,
  price: property.price,
  location: property.location,
  bedrooms: String(property.bedrooms || 0),
  bathrooms: String(property.bathrooms || 0),
  area: String(property.area || ''),
  description: property.description,
  amenities: property.amenities.join('\n'),
  images: property.images.join('\n'),
  brochureUrl: property.brochureUrl || '',
  videoUrl: property.videoUrl || '',
  verified: property.verified ?? true,
  reraNumber: property.reraNumber || '',
  latitude: property.latitude || '',
  longitude: property.longitude || '',
  nearbyPlaces: (property.nearbyPlaces || []).join('\n'),
  possessionStatus: property.possessionStatus || '',
  furnishing: property.furnishing || '',
  facing: property.facing || '',
  floorNumber: property.floorNumber || '',
  totalFloors: property.totalFloors || '',
  parking: property.parking || '',
  ageOfProperty: property.ageOfProperty || '',
  status: property.status || 'Available',
  featured: Boolean(property.featured),
})

const formToProperty = (form) => {
  const area = Number(form.area) || 0

  return {
    ...form,
    slug: createSlug(form.slug || form.title),
    bedrooms: Number(form.bedrooms) || 0,
    bathrooms: Number(form.bathrooms) || 0,
    area,
    budget: Number(String(form.price).replace(/[^0-9]/g, '')) || 0,
    size: area ? `${area.toLocaleString('en-IN')} sq.ft.` : 'NA',
    amenities: parseList(form.amenities),
    images: parseList(form.images),
    nearbyPlaces: parseList(form.nearbyPlaces),
    map: `https://maps.google.com/maps?q=${encodeURIComponent(form.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`,
  }
}

export function PropertiesAdminPage() {
  const [editingProperty, setEditingProperty] = useState(null)
  const [form, setForm] = useState(emptyPropertyForm)
  const { addProperty, deleteProperty, properties, toggleFeatured, updateProperty } = useProperties()

  useSeo({
    title: 'Admin Properties | OMProperties',
    description: 'Manage OMProperties property listings.',
  })

  const sortedProperties = useMemo(
    () => [...properties].sort((a, b) => String(a.title).localeCompare(String(b.title))),
    [properties],
  )

  const updateForm = (event) => {
    const { checked, name, type, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'title' && !editingProperty ? { slug: createSlug(value) } : {}),
    }))
  }

  const resetForm = () => {
    setEditingProperty(null)
    setForm(emptyPropertyForm)
  }

  const editProperty = (property) => {
    setEditingProperty(property)
    setForm(propertyToForm(property))
  }

  const submitProperty = (event) => {
    event.preventDefault()
    const property = formToProperty(form)

    if (editingProperty) {
      updateProperty(editingProperty.id, property)
    } else {
      addProperty(property)
    }

    resetForm()
  }

  return (
    <AdminLayout>
      <section className="properties-admin-page">
        <div className="admin-topline">
          <div>
            <p className="eyebrow">Property Management</p>
            <h1>Properties</h1>
          </div>
          <span>{properties.length} listings</span>
        </div>

        <form className="property-admin-form" onSubmit={submitProperty}>
          <div className="property-admin-form__head">
            <h2>{editingProperty ? 'Edit Property' : 'Add Property'}</h2>
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
            Purpose
            <select name="purpose" value={form.purpose} onChange={updateForm}>
              {PURPOSES.map((purpose) => (
                <option key={purpose}>{purpose}</option>
              ))}
            </select>
          </label>
          <label>
            Type
            <select name="type" value={form.type} onChange={updateForm}>
              {PROPERTY_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={updateForm}>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select name="status" value={form.status} onChange={updateForm}>
              {PROPERTY_STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label>
            Price
            <input name="price" value={form.price} onChange={updateForm} required />
          </label>
          <label>
            Location
            <input name="location" value={form.location} onChange={updateForm} required />
          </label>
          <label>
            Bedrooms
            <input name="bedrooms" value={form.bedrooms} onChange={updateForm} min="0" type="number" />
          </label>
          <label>
            Bathrooms
            <input name="bathrooms" value={form.bathrooms} onChange={updateForm} min="0" type="number" />
          </label>
          <label>
            Area
            <input name="area" value={form.area} onChange={updateForm} min="0" type="number" />
          </label>
          <label className="featured-control">
            <input name="featured" checked={form.featured} onChange={updateForm} type="checkbox" />
            Mark as featured
          </label>
          <label className="featured-control">
            <input name="verified" checked={form.verified} onChange={updateForm} type="checkbox" />
            Verified property
          </label>
          <label>
            RERA Number
            <input name="reraNumber" value={form.reraNumber} onChange={updateForm} />
          </label>
          <label>
            Brochure URL
            <input name="brochureUrl" value={form.brochureUrl} onChange={updateForm} />
          </label>
          <label>
            Video URL
            <input name="videoUrl" value={form.videoUrl} onChange={updateForm} />
          </label>
          <label>
            Latitude
            <input name="latitude" value={form.latitude} onChange={updateForm} />
          </label>
          <label>
            Longitude
            <input name="longitude" value={form.longitude} onChange={updateForm} />
          </label>
          <label>
            Possession Status
            <input name="possessionStatus" value={form.possessionStatus} onChange={updateForm} />
          </label>
          <label>
            Furnishing
            <input name="furnishing" value={form.furnishing} onChange={updateForm} />
          </label>
          <label>
            Facing
            <input name="facing" value={form.facing} onChange={updateForm} />
          </label>
          <label>
            Floor Number
            <input name="floorNumber" value={form.floorNumber} onChange={updateForm} />
          </label>
          <label>
            Total Floors
            <input name="totalFloors" value={form.totalFloors} onChange={updateForm} />
          </label>
          <label>
            Parking
            <input name="parking" value={form.parking} onChange={updateForm} />
          </label>
          <label>
            Age of Property
            <input name="ageOfProperty" value={form.ageOfProperty} onChange={updateForm} />
          </label>
          <label className="wide">
            Description
            <textarea name="description" value={form.description} onChange={updateForm} rows="4" required />
          </label>
          <label>
            Amenities
            <textarea name="amenities" value={form.amenities} onChange={updateForm} rows="5" placeholder="One per line or comma separated" />
          </label>
          <label>
            Image URLs
            <textarea name="images" value={form.images} onChange={updateForm} rows="5" placeholder="One per line or comma separated" required />
          </label>
          <label className="wide">
            Nearby Places
            <textarea name="nearbyPlaces" value={form.nearbyPlaces} onChange={updateForm} rows="4" placeholder="One per line or comma separated" />
          </label>
          <button className="button primary wide" type="submit">
            <Plus size={16} /> {editingProperty ? 'Update Property' : 'Add Property'}
          </button>
        </form>

        <div className="properties-admin-list">
          {sortedProperties.map((property) => (
            <article className="properties-admin-row" key={property.id}>
              <img src={property.images[0]} alt={property.title} />
              <div>
                <strong>{property.title}</strong>
                <span>{property.type} / {property.purpose} / {property.status || 'Available'}</span>
                <span>{property.location}</span>
              </div>
              <button className={property.featured ? 'featured-toggle active' : 'featured-toggle'} type="button" onClick={() => toggleFeatured(property.id)}>
                <Star size={16} /> {property.featured ? 'Featured' : 'Feature'}
              </button>
              <button className="button muted" type="button" onClick={() => editProperty(property)}>
                <Edit3 size={16} /> Edit
              </button>
              <button className="button dark" type="button" onClick={() => deleteProperty(property.id)}>
                <Trash2 size={16} /> Delete
              </button>
            </article>
          ))}
        </div>
      </section>
    </AdminLayout>
  )
}
