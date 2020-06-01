import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Logo, MainNavItem, MegaNav } from './index'
import { setMegaNavOpen } from '../../modules/app'

function TopBar(): ReactElement {

  const dispatch = useDispatch()

  const { pathname } = useLocation()

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
          <MainNavItem name="Venue" to="venue-calendar" />
          <MainNavItem name="Apps" />
          <MainNavItem name="Label" />
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
          <li
            className="main-nav-item"
            onClick={openMegaNavOnClick}
          >
            More&hellip;
          </li>
        </ul>
      </nav>

      <MegaNav />
    </>
  )
}

export default TopBar
