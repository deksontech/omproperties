import { Route, Routes } from 'react-router-dom'
import { ProtectedAdminRoute } from './components/common/ProtectedAdminRoute'
import { AppProviders } from './context/AppProviders'
import { useScrollTop } from './hooks/useScrollTop'
import { MainLayout } from './layouts/MainLayout'
import { AboutPage } from './pages/About/AboutPage'
import { AdminPage } from './pages/Admin/AdminPage'
import { LeadsPage } from './pages/Admin/LeadsPage'
import { LoginPage } from './pages/Admin/LoginPage'
import { PropertiesAdminPage } from './pages/Admin/PropertiesAdminPage'
import { TurnkeyAdminPage } from './pages/Admin/TurnkeyAdminPage'
import { ContactPage } from './pages/Contact/ContactPage'
import { ComparePropertiesPage } from './pages/CompareProperties/ComparePropertiesPage'
import { HomePage } from './pages/Home/HomePage'
import { InsightDetailsPage } from './pages/Insights/InsightDetailsPage'
import { InsightsPage } from './pages/Insights/InsightsPage'
import { LocationLandingPage } from './pages/Landing/LocationLandingPage'
import { NotFoundPage } from './pages/NotFound/NotFoundPage'
import { PropertiesPage } from './pages/Properties/PropertiesPage'
import { PropertyDetailsPage } from './pages/PropertyDetails/PropertyDetailsPage'
import { SavedPropertiesPage } from './pages/SavedProperties/SavedPropertiesPage'
import { ServiceDetailsPage } from './pages/ServiceDetails/ServiceDetailsPage'
import { TurnkeyPage } from './pages/Turnkey/TurnkeyPage'
import { TurnkeyEstimatorPage } from './pages/TurnkeyEstimator/TurnkeyEstimatorPage'

function AppRoutes() {
  useScrollTop()

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/saved-properties" element={<SavedPropertiesPage />} />
        <Route path="/compare-properties" element={<ComparePropertiesPage />} />
        <Route path="/property/:slug" element={<PropertyDetailsPage />} />
        <Route path="/turnkey" element={<TurnkeyPage />} />
        <Route path="/turnkey-cost-estimator" element={<TurnkeyEstimatorPage />} />
        <Route path="/turnkey/:slug" element={<ServiceDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/locations/:slug" element={<LocationLandingPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<InsightDetailsPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/leads" element={<LeadsPage />} />
          <Route path="/admin/properties" element={<PropertiesAdminPage />} />
          <Route path="/admin/turnkey" element={<TurnkeyAdminPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}
