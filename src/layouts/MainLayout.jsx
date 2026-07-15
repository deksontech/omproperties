import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { PublicFooter } from '../components/layout/PublicFooter'
import { PublicHeader } from '../components/layout/PublicHeader'
import { CompareBar } from '../components/property/CompareBar'
import { SiteVisitModal } from '../components/common/SiteVisitModal'
import { CookieConsent } from '../components/public/CookieConsent'
import { PrelaunchPlotPopup } from '../components/public/PrelaunchPlotPopup'
import { StickyContactActions } from '../components/public/StickyContactActions'
import { SiteVisitContext } from '../context/SiteVisitContext'

export function MainLayout() {
  const { pathname } = useLocation()
  const isAdminRoute = pathname.startsWith('/admin')
  const isContactPage = pathname === '/contact'
  const [siteVisit, setSiteVisit] = useState({ isOpen: false })

  const openSiteVisit = (details = {}) => {
    setSiteVisit({ ...details, isOpen: true })
  }

  const closeSiteVisit = () => {
    setSiteVisit((current) => ({ ...current, isOpen: false }))
  }

  if (isAdminRoute) {
    return (
      <main className="admin-main">
        <Outlet />
      </main>
    )
  }

  return (
    <SiteVisitContext.Provider value={{ openSiteVisit }}>
      <PublicHeader />
      <main className="public-main">
        <Outlet />
      </main>
      <PublicFooter />
      <CompareBar />
      {!isContactPage && <StickyContactActions onSiteVisit={() => openSiteVisit({ sourcePage: pathname })} />}
      <PrelaunchPlotPopup />
      <CookieConsent />
      <SiteVisitModal
        isOpen={siteVisit.isOpen}
        onClose={closeSiteVisit}
        propertyName={siteVisit.propertyName}
        serviceName={siteVisit.serviceName}
        sourcePage={siteVisit.sourcePage || pathname}
      />
    </SiteVisitContext.Provider>
  )
}
