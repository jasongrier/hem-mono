import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

function TopBar(): ReactElement {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(function checkOnInit() {
    checkScrollTop()
  }, [])

  useEffect(function scrollSpy() {
    $(window).on('scroll', checkScrollTop)
  }, [collapsed])

  function checkScrollTop() {
    const scrollTop = $(window).scrollTop()

    if (!scrollTop) return

    if (scrollTop >= 665 && !collapsed) {
      setCollapsed(true)
    }

    else if (scrollTop < 665 && collapsed) {
      setCollapsed(false)
    }
  }

  return (
    <header className={`
      top-bar
      ${ collapsed ? ' top-bar-collapsed' : '' }
    `}>
      <h1 className="logo">
        <Link to="/">HEM</Link>
      </h1>
    </header>
  )
}

export default TopBar
