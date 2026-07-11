import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LuxurySection } from './LuxurySection'

export function PropertyCategories({ categories }) {
  return (
    <LuxurySection eyebrow="Browse Categories" title="Explore premium residential and commercial opportunities">
      <div className="luxury-category-grid">
        {categories.map((category) => (
          <Link className="luxury-category-card" to={`/properties?type=${category.name}`} key={category.name}>
            <img src={category.image} alt={category.name} />
            <div>
              <span>{category.count}+ Listings</span>
              <h3>{category.name}</h3>
              <em>
                Explore <ArrowRight size={15} />
              </em>
            </div>
          </Link>
        ))}
      </div>
    </LuxurySection>
  )
}
