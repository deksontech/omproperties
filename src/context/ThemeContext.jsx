import { useMemo } from 'react'
import { ThemeContext } from './themeContextValue'

export function ThemeProvider({ children }) {
  const value = useMemo(
    () => ({
      theme: 'premium-light',
    }),
    [],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
