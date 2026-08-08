import { useEffect } from 'react'

const SITE = 'React Academy'

/**
 * A single-page app never reloads, so the tab title and meta description stay on
 * whatever `index.html` shipped unless a page sets them. Bookmarks, shared links
 * and browser history all read from these.
 */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : SITE

    if (!description) return
    const tag = document.querySelector('meta[name="description"]')
    if (!tag) return
    const previous = tag.getAttribute('content')
    tag.setAttribute('content', description)
    return () => {
      if (previous !== null) tag.setAttribute('content', previous)
    }
  }, [title, description])
}
