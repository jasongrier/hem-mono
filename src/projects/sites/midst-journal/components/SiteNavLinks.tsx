import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

function SiteNavLinks(): ReactElement {
  return (
    <>
      <NavLink activeClassName="active" to="/read">Read</NavLink>
      <NavLink activeClassName="active" to="/nominate">Nominate</NavLink>
      <NavLink activeClassName="active" to="/app">App</NavLink>
      <NavLink activeClassName="active" to="/contact">Contact</NavLink>
    </>
  )
}

export default SiteNavLinks
