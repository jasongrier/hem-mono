import React, { PropsWithChildren, ReactElement, useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Hide, ElectronNot } from '../../../../../lib/components'
import { RootState } from '../../../index'
import '../../../styles/jag.rip'
import { hasTag } from '../../../modules/core/content'

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
        </ElectronNot>
      </header>
      <div className="main-jag">
        { children }
      </div>
      <ElectronNot>
        <Hide from={[
          'bespoke-web-developer',
          'react-javascript-consulting',
        ]}>
          <footer className="main-footer">
            <p>
              &copy; Jason Grier, 2021
              &nbsp;|&nbsp;<Link to="#">News</Link>
              &nbsp;|&nbsp;<Link to="#">Contact</Link>
              &nbsp;|&nbsp;<Link to="#">About</Link>
              &nbsp;|&nbsp;<a href="https://web.facebook.com/jasongriermusic">FB</a>
              &nbsp;|&nbsp;<a href="mailto:j@hem.rocks">j@hem.rocks</a>
              <br/>
              <br/>
              <Link
                target="_blank"
                to="/react-javascript-consulting"
              >
                React Javascript Consulting
              </Link>
              &nbsp;|&nbsp;
              <Link
                target="_blank"
                to="/bespoke-web-developer"
              >
                Bespoke Web Developer
              </Link>
            </p>
          </footer>
        </Hide>
      </ElectronNot>
    </div>
  )
}

export default ProjectFrame
