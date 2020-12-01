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
      '/sound-library',
      '/sound-library/about',
      '/sound-library/made-with-sl',
      '/internal',
      '/label',
      '/tracks',
      '/press',
      '/mailing-list',
      '/contact',
      '/support',
      '/press-kits',
      '/privacy-policy',
      '/cookies-policy',
      '/react-consulting',
    ]

    if (forPaths.includes(pathname)) {
      $(scrollPaneSelector).scrollTop(0)
      console.log($(scrollPaneSelector).scrollTop())
    }

    else {
      console.log('*** Did NOT scroll to the top! >> ' + pathname)
    }
  }, [pathname])

  return <span />
}

export default ScrollToTop
