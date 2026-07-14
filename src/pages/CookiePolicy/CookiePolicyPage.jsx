import { ShieldCheck } from 'lucide-react'
import { PageHero } from '../../components/public/PageHero'
import { CONTACT_EMAIL } from '../../constants/contact'
import { useSeo } from '../../hooks/useSeo'

const cookieGroups = [
  {
    title: 'Essential Cookies',
    description:
      'Required for basic site features such as saved preferences, comparison tools, enquiry flow, and admin session continuity.',
  },
  {
    title: 'Preference Storage',
    description:
      'Remembers choices such as cookie consent, saved properties, compared properties, and recently viewed listings on your device.',
  },
  {
    title: 'Analytics Cookies',
    description:
      'Optional cookies that may help us understand page usage and improve property discovery once analytics tools are connected.',
  },
  {
    title: 'Marketing Cookies',
    description:
      'Optional cookies that may support relevant property updates, campaign measurement, and retargeting when marketing tools are added.',
  },
]

export function CookiePolicyPage() {
  useSeo({
    title: 'Cookie Policy | OMProperties',
    description:
      'Learn how OMProperties uses essential and optional cookies, localStorage preferences, and privacy choices on the website.',
  })

  return (
    <div className="public-page cookie-policy-page">
      <PageHero
        eyebrow="Cookie Policy"
        title="Clear privacy choices for every visitor."
        subtitle="This policy explains how OMProperties uses cookies and browser storage to keep the website reliable, useful, and easy to use."
      />

      <section className="public-section">
        <div className="cookie-policy-grid">
          <article className="premium-card cookie-policy-intro">
            <ShieldCheck aria-hidden="true" />
            <h2>How We Use Cookies</h2>
            <p>
              Cookies and browser storage help the website remember your choices, keep forms and property tools working,
              and improve the browsing experience. We currently use localStorage for consent preferences, saved
              properties, compared properties, recently viewed properties, mock enquiries, and temporary admin sessions.
            </p>
            <p>
              Optional analytics and marketing cookies are not required to browse OMProperties. If they are added in the
              future, your cookie preference will guide how those tools are enabled.
            </p>
          </article>

          {cookieGroups.map((group) => (
            <article className="premium-card" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="public-section compact">
        <div className="premium-card cookie-policy-note">
          <h2>Managing Your Choices</h2>
          <p>
            You can accept all cookies, reject optional cookies, or save custom preferences from the consent banner. You
            can also clear this website's stored data from your browser settings at any time.
          </p>
          <p>
            For privacy questions or data requests, contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
