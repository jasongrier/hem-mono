import React, { PropsWithChildren, ReactElement, useCallback, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ElectronOnly } from '../../../../../lib/components'
import '../../../styles/jag.rip'

interface IProps {}

function ProjectFrame({ children }: PropsWithChildren<IProps>): ReactElement {
  const [moreLinkClicked, setMoreLinkClicked] = useState<boolean>(false)

  const { pathname } = useLocation()

  const moreLinkOnClick = useCallback(
    function moreLinkOnClickFn() {
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
        { !moreLinkClicked && (
          <a
            href="#more-anchor"
            onClick={moreLinkOnClick}
          >
            &darr;
          </a>
        )}
        <a id="more-anchor">????</a>
      </footer>
    </div>
  )
}

export default ProjectFrame
