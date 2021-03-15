import React, { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import $ from 'jquery'
import { usePrevious } from '../hooks'

function ScrollToTop(): ReactElement {
  const { pathname } = useLocation()

  const previousPathname = usePrevious(pathname)

  useEffect(() => {
    if (pathname === previousPathname) return
    if (pathname?.includes('/detail/')) return
    if (pathname?.includes('/exhibit/')) return
    if (previousPathname?.includes('/detail/')) return
    if (previousPathname?.includes('/exhibit/')) return

    $('.scroll-lock-container').scrollTop(0)
  }, [pathname, previousPathname])

  return <span />
}

export default ScrollToTop
