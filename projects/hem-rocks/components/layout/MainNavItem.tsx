import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { slugify } from 'voca'

interface IProps {
  name: string

  activeFor?: string[]
  additive?: boolean
  displayName?: string
  to?: string
}

function MainNavItem({ name, activeFor, additive = false, displayName, to }: IProps): ReactElement {
  const { pathname } = useLocation()

  const slug = slugify(name)

  return (
    <li className="main-nav-item">
      <NavLink
        to={`${additive ? pathname : ''}/${to || slug}`}
        isActive={activeFor ? (_, { pathname }) => {
          let isActive = false

          for (const hint of activeFor) {
            if (pathname.includes(hint)) {
              isActive = true
            }
          }

          return isActive
        } : undefined}
      >
        { displayName || name }
      </NavLink>
    </li>
  )
}

export default MainNavItem
