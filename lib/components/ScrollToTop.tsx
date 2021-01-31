import React, { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import $ from 'jquery'

interface IProps {
  scrollPaneSelector: string
}

function ScrollToTop({ scrollPaneSelector }: IProps): ReactElement {
  const { pathname } = useLocation()

  useEffect(() => {
    const forPaths = [
      '/',
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
      '/sound-library/about',
      '/sound-library/made-with-sl',
      '/support',
      '/tracks',
    ]

    if (
      forPaths.includes(pathname)
      && $(scrollPaneSelector).scrollTop() !== undefined
    ) {
      $(scrollPaneSelector).scrollTop(0)
    }

    else {
      console.log('*** Did NOT scroll to the top! >> ' + pathname)
    }
  }, [pathname])

  return <span />
}

export default ScrollToTop
