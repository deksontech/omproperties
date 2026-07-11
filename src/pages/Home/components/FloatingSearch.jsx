import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { createPropertySearchQuery } from '../../../utils/propertyFilters'

const initialSearch = {
  purpose: 'buy',
  type: '',
  location: '',
  budget: '',
}

export function FloatingSearch({ categories }) {
  const [search, setSearch] = useState(initialSearch)
  const navigate = useNavigate()

  const updateSearch = (event) => {
    setSearch((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submitSearch = (event) => {
    event.preventDefault()
    const query = createPropertySearchQuery(search)
    navigate(query ? `/properties?${query}` : '/properties')
  }

  return (
    <section className="luxury-search-wrap fade-up">
      <form className="luxury-search-card" onSubmit={submitSearch}>
        <label>
          Purpose
          <select name="purpose" value={search.purpose} onChange={updateSearch}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
            <option value="rent">Rent</option>
            <option value="lease">Lease</option>
          </select>
        </label>
        <label>
          Property Type
          <select name="type" value={search.type} onChange={updateSearch}>
            <option value="">All Properties</option>
            {categories.map((category) => (
              <option value={category.name} key={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Location
          <input name="location" value={search.location} onChange={updateSearch} placeholder="City or locality" />
        </label>
        <label>
          Budget
          <select name="budget" value={search.budget} onChange={updateSearch}>
            <option value="">Any Budget</option>
            <option value="5000000">Under Rs 50L</option>
            <option value="7500000">Under Rs 75L</option>
            <option value="15000000">Under Rs 1.5Cr</option>
            <option value="50000000">Under Rs 5Cr</option>
          </select>
        </label>
        <button className="luxury-button luxury-button--gold" type="submit">
          Search <Search size={18} />
        </button>
      </form>
    </section>
  )
}
