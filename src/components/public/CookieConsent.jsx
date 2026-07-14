import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { STORAGE_KEYS } from '../../constants/storageKeys'
import { safeStorage } from '../../utils/safeStorage'

const defaultPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
}

function saveConsent(status, preferences) {
  safeStorage.set(STORAGE_KEYS.cookieConsent, {
    status,
    preferences: { ...defaultPreferences, ...preferences, essential: true },
    updatedAt: new Date().toISOString(),
  })
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isManaging, setIsManaging] = useState(false)
  const [preferences, setPreferences] = useState(defaultPreferences)

  useEffect(() => {
    const existingConsent = safeStorage.get(STORAGE_KEYS.cookieConsent, null)
    setIsVisible(!existingConsent)
  }, [])

  const updatePreference = (key) => {
    setPreferences((current) => ({ ...current, [key]: !current[key] }))
  }

  const acceptAll = () => {
    saveConsent('accepted', { analytics: true, marketing: true })
    setIsVisible(false)
  }

  const rejectOptional = () => {
    saveConsent('rejected', defaultPreferences)
    setIsVisible(false)
  }

  const saveChoices = () => {
    saveConsent('custom', preferences)
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <section className="cookie-consent" aria-label="Cookie consent">
      <div className="cookie-consent__copy">
        <p className="eyebrow">Privacy Preferences</p>
        <h2>Your cookie choices</h2>
        <p>
          We use essential cookies for site functionality and optional cookies to improve enquiries, insights, and
          browsing experience. You can manage your choices before continuing.
        </p>
        <Link to="/cookie-policy">Read cookie policy</Link>
      </div>

      {isManaging && (
        <div className="cookie-consent__options">
          <label>
            <input type="checkbox" checked readOnly disabled />
            <span>
              <strong>Essential</strong>
              Required for core website features.
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={() => updatePreference('analytics')}
            />
            <span>
              <strong>Analytics</strong>
              Helps us understand page performance.
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={() => updatePreference('marketing')}
            />
            <span>
              <strong>Marketing</strong>
              Supports relevant property updates.
            </span>
          </label>
        </div>
      )}

      <div className="cookie-consent__actions">
        {isManaging ? (
          <>
            <button className="public-button secondary" type="button" onClick={() => setIsManaging(false)}>
              Back
            </button>
            <button className="public-button primary" type="button" onClick={saveChoices}>
              Save Choices
            </button>
          </>
        ) : (
          <>
            <button className="public-button secondary" type="button" onClick={rejectOptional}>
              Reject Optional
            </button>
            <button className="public-button secondary" type="button" onClick={() => setIsManaging(true)}>
              Manage
            </button>
            <button className="public-button primary" type="button" onClick={acceptAll}>
              Accept All
            </button>
          </>
        )}
      </div>
    </section>
  )
}
