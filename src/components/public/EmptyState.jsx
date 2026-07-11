import { memo } from 'react'
import { SearchX } from 'lucide-react'

export const EmptyState = memo(function EmptyState({ title, message, action }) {
  return (
    <div className="public-empty-state" role="status">
      <SearchX size={34} />
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action}
    </div>
  )
})
