import { useEffect } from 'react'

interface IOpts {
  title: string
  description?: string
  keywords?: string
}

function useSeoMeta({
  title,
  description,
  keywords,
}: IOpts) {
  useEffect(function() {
    document.title = title

    if (description) {
      // Insert the element...
    }

    if (keywords) {
      // Insert the element...
    }
  }, [])
}

export function useDocumentTitle(title: string) {
  useSeoMeta({ title })
}

export default useSeoMeta