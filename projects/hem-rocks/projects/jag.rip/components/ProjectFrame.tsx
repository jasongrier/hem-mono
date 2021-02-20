import React, { PropsWithChildren, ReactElement, useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ElectronOnly, ElectronNot } from '../../../../../lib/components'
import { RootState } from '../../../index'
import '../../../styles/jag.rip'
import { hasTag } from '../../../modules/content'

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
    const scrollLockContainer = document.querySelector('.scroll-lock-container')
    if (!scrollLockContainer) return
    scrollLockContainer.addEventListener('scroll', function hideMoreLink() {
      setShowMoreLink(false)
    })
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
          <h1>
            <Link to="/">
              Jason Grier
            </Link>
          </h1>
        </ElectronNot>
        <div className="admin-link">
          { !pathname.includes('admin') && (
            <ElectronOnly>
              <Link to="/admin/list">Admin</Link>
            </ElectronOnly>
          )}
        </div>
      </header>
      <div className="main-jag">
        { children }
      </div>
      <footer className="main-footer">
        <ElectronNot>
          { showMoreLink
            && itemsCount > 2
            && (
              <a
                className="more-link"
                href="#"
                onClick={moreLinkOnClick}
              >
                &darr;
              </a>
          )}
        </ElectronNot>
      </footer>
    </div>
  )
}

export default ProjectFrame
