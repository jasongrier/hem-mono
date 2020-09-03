import React, { ReactElement } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ElectronOnly } from '../../../../lib/components'
import { RootState } from '../../index'

function Header(): ReactElement {
  const { productsCount } = useSelector((state: RootState) => ({
    productsCount: state.cart.products.length,
  }))

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
              <strong>Order Prints</strong>
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
                View Cart ({ productsCount })
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
