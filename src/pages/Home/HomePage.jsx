import { useMemo, useState } from 'react'
import { SEO } from '../../constants/seo'
import { useProperties } from '../../hooks/useProperties'
import { useSeo } from '../../hooks/useSeo'
import { useTurnkey } from '../../hooks/useTurnkey'
import { categoryImages } from './homeContent'
import { FeaturedProperties } from './components/FeaturedProperties'
import { FinalCTA } from './components/FinalCTA'
import { FloatingSearch } from './components/FloatingSearch'
import { HomeFAQ } from './components/HomeFAQ'
import { HowWeWork } from './components/HowWeWork'
import { InsightsSection } from './components/InsightsSection'
import { InvestmentSection } from './components/InvestmentSection'
import { LuxuryHero } from './components/LuxuryHero'
import { PropertyCategories } from './components/PropertyCategories'
import { ServicesBeyondProperty } from './components/ServicesBeyondProperty'
import { TestimonialsSection } from './components/TestimonialsSection'
import { TurnkeyHomeSection } from './components/TurnkeyHomeSection'
import { WhyChooseUs } from './components/WhyChooseUs'
import './HomePage.css'

export function HomePage() {
  const [openFaq, setOpenFaq] = useState(0)
  const { featuredProperties, properties } = useProperties()
  const { activeServices } = useTurnkey()

  useSeo(SEO.home)

  const categories = useMemo(
    () =>
      Object.entries(categoryImages).map(([name, image]) => ({
        name,
        image,
        count: properties.filter((property) => property.type === name).length || 1,
      })),
    [properties],
  )

  const toggleFaq = (index) => {
    setOpenFaq((current) => (current === index ? -1 : index))
  }

  return (
    <div className="luxury-home">
      <LuxuryHero />
      <FloatingSearch categories={categories} />
      <PropertyCategories categories={categories} />
      <WhyChooseUs />
      <ServicesBeyondProperty />
      <FeaturedProperties properties={featuredProperties} />
      <TurnkeyHomeSection services={activeServices} />
      <HowWeWork />
      <InvestmentSection />
      <InsightsSection />
      <TestimonialsSection />
      <HomeFAQ openFaq={openFaq} onToggleFaq={toggleFaq} />
      <FinalCTA />
    </div>
  )
}
