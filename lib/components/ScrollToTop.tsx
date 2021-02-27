import React, { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import $ from 'jquery'

interface IProps {
  scrollPaneSelector: string
}

function ScrollToTop({ scrollPaneSelector }: IProps): ReactElement {
  const { pathname } = useLocation()

  useEffect(() => {
    const exactPaths = [
      '/'
    ]

    const fuzzyPaths = [
      '/admin/list',
      '/about',
      '/apps',
      '/artists',
      '/contact',
      '/cookies-policy',
      '/internal',
      '/label',
      '/mailing-list',
      '/playlists',
      '/press-kits',
      '/press-releases',
      '/press',
      '/privacy-policy',
      '/react-consulting',
      '/recipes',
      '/sound-library',
      '/support',
      '/tracks',
    ]

    let matched = false

    for (const path of exactPaths) {
      if (pathname === path) {
        matched = true
        break
      }
    }

    if (!matched) {
      for (const path of fuzzyPaths) {
        if (pathname.includes(path)) {
          matched = true
          break
        }
      }
    }

    if (matched && $(scrollPaneSelector).scrollTop() !== undefined) {
      console.log('*** We DID scroll to the top! >> ' + pathname)
      $(scrollPaneSelector).scrollTop(0)
    }

    else {
      console.log('*** Did NOT scroll to the top! >> ' + pathname)
    }
  }, [pathname])

  return <span />
}

export default ScrollToTop
