import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { ElectronOnly } from '../../../../lib/components'
import { Logo, MainNavItem, MegaNav } from './index'
import { ReleasePhase } from '../layout'
import { setMegaNavOpen } from '../../modules/app'

function TopBar(): ReactElement {

  const dispatch = useDispatch()

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

  const openMegaNavOnClick = useCallback(
    function openMegaNavOnClickFn() {
      dispatch(setMegaNavOpen(true))
    }, [],
  )

  return (
    <>
      <header className={`
        top-bar
        ${ true ? ' top-bar-collapsed' : '' }
      `}>
        <Logo />
      </header>

      <nav className="main-nav">
        <ul className="main-nav-items">
          <MainNavItem name="Sound Library" />

          <ReleasePhase phase={10}>
            <MainNavItem name="Apps" />
            <MainNavItem name="Venue" to="venue-calendar" />
          </ReleasePhase>

          <MainNavItem name="Label" />
          <MainNavItem name="Tracks" />
          <MainNavItem name="Blog" />

          <ReleasePhase exact phase={1}>
            <MainNavItem name="About" />
          </ReleasePhase>

          { showCart && (
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
                Cart
              </NavLink>
            </li>
          )}

          <ElectronOnly>
            <MainNavItem name="Admin" to="admin/list" />
          </ElectronOnly>

          <ReleasePhase phase={10}>
            <li
              className="main-nav-item"
              onClick={openMegaNavOnClick}
            >
              More&hellip;
            </li>
          </ReleasePhase>
        </ul>
      </nav>

      <MegaNav />
    </>
  )
}

export default TopBar
