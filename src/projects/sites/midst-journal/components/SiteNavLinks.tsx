import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

interface IProps {
  location: any
}

function SiteNavLinks({ location }: IProps): ReactElement {

  const wrapperClassName = location.pathname.split(/\//g)[1] === 'poem'
    ? 'poem'
    : 'normal'

  return (
    <div className={`nav-links-wrapper nav-links-wrapper--${wrapperClassName}`}>
      <NavLink activeClassName="active" to="/read">Read</NavLink>
      <NavLink activeClassName="active" to="/nominate">Nominate</NavLink>
      <NavLink activeClassName="active" to="/app">App</NavLink>
      <NavLink
        className="about-link--mobile"
        activeClassName="active"
        to="/about"
      >
        ?
      </NavLink>
    </div>
  )
}

export default SiteNavLinks
