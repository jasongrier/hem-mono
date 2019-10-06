import React, { ReactElement } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Hide } from '../../../../common/components'

function SiteNavLinks(): ReactElement {
  return (
    <>
      <NavLink activeClassName="active" to="/read">Read</NavLink>
      <NavLink activeClassName="active" to="/nominate">Nominate</NavLink>
      <NavLink activeClassName="active" to="/app">App</NavLink>
      <NavLink activeClassName="active" to="/contact">Contact</NavLink>
      <Hide from="/poem/:slug">
        <NavLink
          className="about-link--mobile"
          activeClassName="active"
          to="/about"
        >?</NavLink>
        <NavLink
          className="about-link--mobile light"
          activeClassName="active"
          to="/about"
        >?</NavLink>
      </Hide>
    </>
  )
}

export default SiteNavLinks
