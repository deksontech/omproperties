const MOCK_DELAY_MS = 0

export const mockApi = (payload) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(structuredClone(payload)), MOCK_DELAY_MS)
  })
