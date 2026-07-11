import { memo, useCallback, useEffect, useState } from 'react'
import { RotateCcw, Search } from 'lucide-react'
import {
  AREA_OPTIONS,
  BEDROOM_OPTIONS,
  BUDGET_OPTIONS,
  CATEGORY_OPTIONS,
  PROPERTY_TYPES,
  PURPOSES,
} from '../../constants/propertyOptions'

export const PropertyFilters = memo(function PropertyFilters({ filters, onFilterChange, onReset, onSearch }) {
  const [draftFilters, setDraftFilters] = useState(filters)

  useEffect(() => {
    setDraftFilters(filters)
  }, [filters])

  const update = useCallback(
    (event) => {
      setDraftFilters((current) => ({ ...current, [event.target.name]: event.target.value }))
    },
    [],
  )

  const submitSearch = useCallback(
    (event) => {
      event.preventDefault()
      if (onSearch) {
        onSearch(draftFilters)
      } else {
        Object.entries(draftFilters).forEach(([name, value]) => onFilterChange(name, value))
      }
    },
    [draftFilters, onFilterChange, onSearch],
  )

  return (
    <form className="filters" aria-label="Property filters" onSubmit={submitSearch}>
      <label>
        Purpose
        <select name="purpose" value={draftFilters.purpose} onChange={update}>
          <option value="">Any Purpose</option>
          {PURPOSES.map((purpose) => (
            <option key={purpose}>{purpose}</option>
          ))}
        </select>
      </label>
      <label>
        Property Type
        <select name="type" value={draftFilters.type} onChange={update}>
          <option value="">Any Type</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <label>
        Location
        <input name="location" value={draftFilters.location} onChange={update} placeholder="City or locality" />
      </label>
      <label>
        Budget
        <select name="budget" value={draftFilters.budget} onChange={update}>
          {BUDGET_OPTIONS.map((budget) => (
            <option key={budget.label} value={budget.value}>
              {budget.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Bedrooms
        <select name="bedrooms" value={draftFilters.bedrooms} onChange={update}>
          {BEDROOM_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Area
        <select name="area" value={draftFilters.area} onChange={update}>
          {AREA_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Category
        <select name="category" value={draftFilters.category} onChange={update}>
          <option value="">Any Category</option>
          {CATEGORY_OPTIONS.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </label>
      <div className="filter-actions">
        <button className="button primary filter-search-button" type="submit">
          Search <Search size={16} />
        </button>
        <button className="button muted filter-clear-button" type="button" onClick={onReset}>
          <RotateCcw size={15} /> Clear
        </button>
      </div>
    </form>
  )
})
