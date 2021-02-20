import React, { PropsWithChildren, ReactElement, useCallback, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ElectronOnly } from '../../../../../lib/components'
import { RootState } from '../../../index'
import '../../../styles/jag.rip'

interface IProps {}

function ProjectFrame({ children }: PropsWithChildren<IProps>): ReactElement {
  const [moreLinkClicked, setMoreLinkClicked] = useState<boolean>(false)

  const { pathname } = useLocation()

  const moreLinkOnClick = useCallback(
    function moreLinkOnClickFn() {
      const thirdBox = document.querySelector('.main-content-box:nth-child(3)')
      if (!thirdBox) return
      thirdBox.scrollIntoView({ behavior: 'smooth' })
      setMoreLinkClicked(true)
    }, [],
  )

  return (
    <div className="jag-rip-site-frame">
      <header className="main-header">
        <h1>Jason Grier</h1>
        <div className="admin-link">
          { !pathname.includes('admin') && (
            <ElectronOnly>
              <Link to="/admin/list">Admin</Link>
            </ElectronOnly>
          )}
        </div>
      </header>
      { children }
      <footer>
        {/* { !moreLinkClicked
          && !pathname.includes('admin')
          && (
            <a
              className="more-link"
              href="#"
              onClick={moreLinkOnClick}
            >
              &darr;
            </a>
        )} */}
      </footer>
    </div>
  )
}

export default ProjectFrame
