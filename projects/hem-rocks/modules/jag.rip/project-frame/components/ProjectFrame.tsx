import React, { PropsWithChildren, ReactElement, useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Hide, ElectronNot } from '../../../../../../lib/components'
import { LandingPageNot } from '../../../core/app'
import { Footer } from './index'
import '../../../../styles/jag.rip'
import { hasTag } from '../../../../modules/core/content'
import { RootState } from '../../../../index'

interface IProps {}

function ProjectFrame({ children }: PropsWithChildren<IProps>): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
  }))

  const [showMoreLink, setShowMoreLink] = useState<boolean>(true)
  const [itemsCount, setItemsCount] = useState<number>(0)

  const { pathname } = useLocation()

  useEffect(function getItemsCount() {
    setShowMoreLink(true)

    setItemsCount(contentItems.filter(i =>
      i.project === 'jag.rip'
      && hasTag(i, pathname.split('/').pop() || '')
    ).length)

  }, [pathname, contentItems])

  useEffect(function hideMoreLinkOnScroll() {
    function hideMoreLink() {
      setShowMoreLink(false)
    }

    const scrollLockContainer = document.querySelector('.scroll-lock-container')

    if (!scrollLockContainer) return

    scrollLockContainer.addEventListener('scroll', hideMoreLink)

    return function cleanup() {
      scrollLockContainer.removeEventListener('scroll', hideMoreLink)
    }
  }, [])

  const moreLinkOnClick = useCallback(
    function moreLinkOnClickFn() {
      const thirdBox = document.querySelector('.main-content-box:nth-child(3)')
      if (!thirdBox) return
      thirdBox.scrollIntoView({ behavior: 'smooth' })
      setShowMoreLink(false)
    }, [],
  )

  return (
    <div className="jag-rip-site-frame">
      <header className="main-header">
        <ElectronNot>
          <LandingPageNot>
            <Hide from={[
              'bespoke-web-developer',
              'react-javascript-consulting',
            ]}>
              <h1>
                <Link to="/">
                  Jason Aaron Grier
                </Link>
              </h1>
            </Hide>
          </LandingPageNot>
        </ElectronNot>
      </header>
      <div className="main-jag">
        { children }
      </div>
      <ElectronNot>
        <LandingPageNot>
          <Hide from={[
            'bespoke-web-developer',
            'react-javascript-consulting',
          ]}>
            <Footer />
          </Hide>
        </LandingPageNot>
      </ElectronNot>
    </div>
  )
}

export default ProjectFrame
