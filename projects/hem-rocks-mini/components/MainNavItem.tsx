import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'
import { slugify } from 'voca'

interface IProps {
  name: string
}

function MainNavItem({ name }: IProps): ReactElement {
  const slug = slugify(name)

  return (
    <li
      className="main-nav-item"
      onClick={() => {
        $('html, body').stop().animate({ scrollTop: 760 }, 250, 'swing')
      }}
    >
      <NavLink to={`/${slug}`}>{ name }</NavLink>
    </li>
  )
}

export default MainNavItem
