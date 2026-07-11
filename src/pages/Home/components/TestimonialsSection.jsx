import { Star } from 'lucide-react'
import { testimonials } from '../homeContent'
import { LuxurySection } from './LuxurySection'

export function TestimonialsSection() {
  return (
    <LuxurySection eyebrow="Customer Testimonials" title="Trusted by families, investors, and business owners">
      <div className="luxury-testimonial-grid">
        {testimonials.map((testimonial) => (
          <article className="luxury-testimonial-card" key={testimonial.name}>
            <img src={testimonial.image} alt={testimonial.name} />
            <div className="luxury-stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={15} fill="currentColor" />
              ))}
            </div>
            <p>{testimonial.review}</p>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.location}</span>
          </article>
        ))}
      </div>
    </LuxurySection>
  )
}
