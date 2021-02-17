import React, { ReactElement } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ElectronOnly } from '../../../../lib/components'
import { RootState } from '../../index'

interface IProps {
  isMobile?: boolean
}

function Nav({ isMobile = false }: IProps): ReactElement {
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
    <ul>
      { isMobile && (
        <li>
          <NavLink to="/" exact>Home</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/stock-photos-prints">
          Order Prints
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
  )
}

export default Nav
