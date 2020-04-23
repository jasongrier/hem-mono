import React, { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop(): ReactElement {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <span />
}

export default ScrollToTop