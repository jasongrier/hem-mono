import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { ElectronOnly } from '../../../../lib/components'
import { Logo, MainNavItem, MegaNav } from './index'
import { HeaderPlayer } from '../../modules/app'
import { RootState } from '../../index'

function TopBar(): ReactElement {
  const { cartProductsCount } = useSelector((state: RootState) => ({
    cartProductsCount: state.cart.products.length,
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
    <>
      <header className={`
        top-bar
        ${ true ? ' top-bar-collapsed' : '' }
      `}>
        <div className="top-bar-inner">
          <Logo />

          <nav className="main-nav">
            <ul className="main-nav-items">
              <MainNavItem name="Sound Library" />
              <MainNavItem name="Tracks" />
              <MainNavItem name="Articles" />
              <MainNavItem name="Editions" />

              { showCart && cartProductsCount > 0 && (
                <li className="main-nav-item">
                  <NavLink
                    to={(() => {
                      const [category, filter, filterName] = pathname.replace(/^\//, '').split('/')

                      if (filter === 'filter') {
                        return `/${category}/cart/${filterName}`
                      }

                      return `${pathname !== '/' ? pathname : ''}/cart`
                    })()}
                  >
                    Cart ({ cartProductsCount })
                  </NavLink>
                </li>
              )}

              <ElectronOnly>
                <MainNavItem name="Admin" to="admin/list" />
              </ElectronOnly>
            </ul>
          </nav>
        </div>
      </header>

      <MegaNav />
    </>
  )
}

export default TopBar
