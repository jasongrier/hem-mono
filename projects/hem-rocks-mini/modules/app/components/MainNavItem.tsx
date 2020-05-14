import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { slugify } from 'voca'
import { collapseTopBar } from '../index'

interface IProps {
  name: string

  additive?: boolean
  displayName?: string
  to?: string
}

function MainNavItem({ name, additive = false, displayName, to }: IProps): ReactElement {
  const dispatch = useDispatch()

  const { pathname } = useLocation()

  const slug = slugify(name)

  return (
    <li className="main-nav-item">
      <NavLink
        to={`${additive ? pathname : ''}/${to || slug}`}
        onClick={() => dispatch(collapseTopBar())}
      >
        { displayName || name }
      </NavLink>
    </li>
  )
}

export default MainNavItem
