import React, { ReactElement } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ElectronOnly } from '../../../../lib/components'

function Header(): ReactElement {
  const { pathname } = useLocation()

  const noCartPaths = [
    '/admin/create',
    '/admin/list',
    '/admin/manual-task-runner',
    '/compilation-iv-artist-info',
    '/checklists',
    '/internal',
  ]

  const showCart = noCartPaths.indexOf(pathname) === -1

  return (
    <header className="main-header">
      <h1>
        <Link to="/">
          Berlin Stock Photos
        </Link>
      </h1>
      <h2>
        Lushness. Weirdness. Greenery. Grit. Updated daily.
      </h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/stock-photos-prints">
              <sup>*</sup>Order Prints<sup>*</sup>
            </NavLink>
          </li>
          { showCart && (
            <li className="main-nav-item">
              <NavLink
                to={(() => {
                  const [bspUrlPrefix, filter, filterName] = pathname.replace(/^\//, '').split('/')

                  if (filter === 'filter') {
                    return `/${bspUrlPrefix}/cart/${filterName}`
                  }

                  return `${pathname !== '/' ? pathname : ''}/cart`
                })()}
              >
                View Cart
              </NavLink>
            </li>
          )}
          <ElectronOnly>
            <li>
              <NavLink to="/admin/list">Admin</NavLink>
            </li>
          </ElectronOnly>
        </ul>
      </nav>
    </header>
  )
}

export default Header
