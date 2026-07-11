import { createContext, useContext } from 'react'

export const SiteVisitContext = createContext({
  openSiteVisit: () => {},
})

export const useSiteVisit = () => useContext(SiteVisitContext)
