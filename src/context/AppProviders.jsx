import { AuthProvider } from './AuthContext'
import { PropertyProvider } from './PropertyContext'
import { PropertyCompareProvider } from './PropertyCompareContext'
import { SavedPropertiesProvider } from './SavedPropertiesContext'
import { SearchProvider } from './SearchContext'
import { ThemeProvider } from './ThemeContext'
import { TurnkeyProvider } from './TurnkeyContext'

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PropertyProvider>
          <SavedPropertiesProvider>
            <PropertyCompareProvider>
              <TurnkeyProvider>
                <SearchProvider>{children}</SearchProvider>
              </TurnkeyProvider>
            </PropertyCompareProvider>
          </SavedPropertiesProvider>
        </PropertyProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
