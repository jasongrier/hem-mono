import React, { ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { ElectronOnly } from '../../../../lib/components'
import { closePopup, openPopup } from '../../../../lib/modules/popups'
import { Logo, MainNavItem, MegaNav } from './index'
import { RootState } from '../../index'

function TopBar(): ReactElement {
  const { cartProductsCount, currentlyOpenPopUp } = useSelector((state: RootState) => ({
    cartProductsCount: state.cart.products.length,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
  }))

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
              <MainNavItem
                name="Tracks"
                activeFor={[
                  '/tracks-overview',
                  '/tracks',
                  '/playlists',
                  '/artists',
                ]}
                to="tracks-overview"
              />

              <MainNavItem
                name="Editions"
                to="editions"
                activeFor={[
                  '/editions',
                  '/editions-physical',
                ]}
              />

              <MainNavItem name="Exhibits" />

              <MainNavItem name="Sound Library" />

              <li className="main-nav-item">
                <a
                  href="#"
                  onClick={() => {
                    dispatch(closePopup())
                    dispatch(openPopup('program-popup'))
                  }}
                >
                  Program
                </a>
              </li>

              { showCart && (
                <li
                  className="main-nav-item"
                >
                  <a
                    href="#"
                    onClick={() => {
                      dispatch(closePopup())
                      dispatch(openPopup('cart-popup'))
                    }}
                  >
                    Cart ({ cartProductsCount })
                  </a>
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
