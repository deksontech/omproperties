import { useEffect } from 'react'

export function useSeo({ title, description }) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [description, title])
}
