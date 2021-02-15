import React, { ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { NavLink, Link } from 'react-router-dom'
import { ElectronOnly } from '../../../../lib/components'
import { closePopup, openPopup } from '../../../../lib/modules/popups'
import { Logo, MainNavItem, MegaNav } from './index'
import { HeaderPlayer } from '../../modules/app'
import { RootState } from '../../index'

function TopBar(): ReactElement {
  const { cartProductsCount, currentlyOpenPopUp } = useSelector((state: RootState) => ({
    cartProductsCount: state.cart.products.length,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
  }))

  const dispatch = useDispatch()

  const { pathname } = useLocation()

  const [programOpen, setProgramOpen] = useState<boolean>(false)

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
              <MainNavItem name="Articles" />
              <MainNavItem name="Editions" />

              <li className="main-nav-item">
                <a
                  href="#"
                  onClick={() => {
                    setProgramOpen(!programOpen)
                  }}
                >
                  Program
                </a>
                { programOpen && (
                  <div className="program-popup">
                    <h2>Program 2021</h2>
                    <div className="program-popup-row">
                      <h3>February</h3>
                      <p><strong>Tracks:</strong>Line Gøttsche, Julia Holter &amp; Michael Pisaro, Sara Galaxia, Kevin Drumm</p>
                      <p><strong>Articles:</strong>Vito Acconci, India Cooke</p>
                      <p><strong>Editions:</strong>Unbekannte petri dish edition</p>
                      <p><strong>Sound Library:</strong>Updates: Destroyed Piano, Studio #Fails, Noise Reduction Artefacts, and more</p>
                    </div>
                    <div className="program-popup-row">
                      <h3>March</h3>
                      <p><strong>Tracks:</strong>Lucrecia Dalt, Jason Urick, Hanne Lippard, Janet Kim</p>
                      <p><strong>Articles:</strong>Jason Grier, Emily Hochmann</p>
                      <p><strong>Editions:</strong>Omonia handmade casette</p>
                      <p><strong>Mixes:</strong>Julia Holter, Line Gøttsche</p>
                      <p><strong>Sound Library:</strong>Grand Piano</p>
                    </div>
                    <div className="program-popup-row">
                      <h3>April</h3>
                      <p><strong>Tracks:</strong>UCC Harlow, Nite Jewel, Jason Grier, Scott Cazan, Charles Gaines</p>
                      <p><strong>Articles:</strong>Hito Steyrl, Kathi Hofer, Charles Gaines</p>
                      <p><strong>Apps:</strong>Seurat, Breto</p>
                      <p><strong>Sound Library:</strong> Viola</p>
                    </div>
                  </div>
                )}
              </li>

              { showCart && (
                <li
                  className="main-nav-item"
                >
                  <Link
                    to={(() => {
                      const [category, filter, filterName] = pathname.replace(/^\//, '').split('/')

                      if (currentlyOpenPopUp === 'cart-popup') {
                        return pathname
                      }

                      if (
                        currentlyOpenPopUp === 'detail-popup'
                        && filterName
                      ) {
                        return `/${category}/cart/${filterName}`
                      }

                      if (filter === 'filter') {
                        return `/${category}/cart/${filterName}`
                      }

                      if (category && currentlyOpenPopUp) {
                        return `/${category}/cart`
                      }

                      return `${pathname !== '/' ? pathname : ''}/cart`
                    })()}
                  >
                    Cart ({ cartProductsCount })
                  </Link>
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
