import { TEMPORARY_MOCK_ADMIN_CREDENTIALS } from '../constants/auth'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { safeStorage } from '../utils/safeStorage'

const createSession = () => ({
  email: TEMPORARY_MOCK_ADMIN_CREDENTIALS.email,
  role: 'admin',
  loggedInAt: new Date().toISOString(),
})

export const authService = {
  getSession: () => safeStorage.get(STORAGE_KEYS.auth, null),

  login: ({ email, password }) =>
    new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (
          email.trim().toLowerCase() === TEMPORARY_MOCK_ADMIN_CREDENTIALS.email &&
          password === TEMPORARY_MOCK_ADMIN_CREDENTIALS.password
        ) {
          const session = createSession()
          safeStorage.set(STORAGE_KEYS.auth, session)
          resolve(session)
          return
        }

        reject(new Error('Invalid email or password.'))
      }, 0)
    }),

  logout: () => {
    safeStorage.remove(STORAGE_KEYS.auth)
  },
}
