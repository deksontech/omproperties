import { useContext } from 'react'
import { TurnkeyContext } from '../context/turnkeyContextValue'

export function useTurnkey() {
  const context = useContext(TurnkeyContext)

  if (!context) {
    throw new Error('useTurnkey must be used within TurnkeyProvider')
  }

  return context
}
