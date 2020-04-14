import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { slugify } from 'voca'
import { collapseTopBar } from '../index'

interface IProps {
  name: string
}

function MainNavItem({ name }: IProps): ReactElement {
  const dispatch = useDispatch()

  const slug = slugify(name)

  return (
    <li className="main-nav-item">
      <NavLink
        to={`/${slug}`}
        onClick={() => dispatch(collapseTopBar())}
      >
        { name }
      </NavLink>
    </li>
  )
}

export default MainNavItem
