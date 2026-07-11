export const PROJECT_TYPES = ['Flat', 'Independent House', 'Villa', 'Office', 'Retail Space']
export const TURNKEY_ESTIMATE_SERVICES = ['Full Turnkey', 'Interior', 'Electrical', 'Exterior', 'Carpentry']
export const FINISH_LEVELS = ['Essential', 'Premium', 'Luxury']

export const TURNKEY_PRICING = {
  'Full Turnkey': { Essential: 1800, Premium: 2600, Luxury: 3800 },
  Interior: { Essential: 1200, Premium: 1900, Luxury: 3000 },
  Electrical: { Essential: 180, Premium: 280, Luxury: 420 },
  Exterior: { Essential: 500, Premium: 900, Luxury: 1500 },
  Carpentry: { Essential: 650, Premium: 1100, Luxury: 1800 },
}

export const PROJECT_TYPE_MULTIPLIERS = {
  Flat: 1,
  'Independent House': 1.08,
  Villa: 1.18,
  Office: 1.05,
  'Retail Space': 1.12,
}
