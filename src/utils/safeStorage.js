export const safeStorage = {
  get(key, fallback) {
    try {
      const value = window.localStorage.getItem(key)
      return value ? JSON.parse(value) : fallback
    } catch {
      return fallback
    }
  },

  remove(key) {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // Ignore localStorage failures; callers can continue with in-memory state.
    }
  },

  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
}
