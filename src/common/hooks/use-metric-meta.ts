import { useEffect } from 'react'

interface IOpts {
  title: string
  description?: string
  keywords?: string
  snippets?: string[]
}

function useMetricMeta({
  title,
  description,
  keywords,
  snippets,
}: IOpts) {
  useEffect(function() {
    document.title = title

    if (description) {
      // Insert the element...
    }

    if (keywords) {
      // Insert the element...
    }

    if (snippets) {
      for (const snippet in snippets) {
        // Insert the element...
      }
    }
  }, [])
}

export function useDocumentTitle(title: string) {
  useMetricMeta({ title })
}

export default useMetricMeta