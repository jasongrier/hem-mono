import React, { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import $ from 'jquery'

interface IProps {
  previouslyOpenPopup: boolean
  scrollPaneSelector: string
}

function ScrollToTop({ previouslyOpenPopup, scrollPaneSelector }: IProps): ReactElement {
  const { pathname } = useLocation()
  const pathnameSplit = pathname.split('/')
  const isDetailPopup = pathnameSplit[2] === 'detail'

  useEffect(() => {
    if (!isDetailPopup) {
      $(scrollPaneSelector).scrollTop(0)
    }
  }, [pathname, previouslyOpenPopup])

  return <span />
}

export default ScrollToTop
