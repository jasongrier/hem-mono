import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function SiteFooter(): ReactElement {
  return (
    <div className="site-footer">
      <Link to="mailing-list">Mailing List</Link> | <Link to="/support">Support</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | <a href="">Privacy Policy</a> | <Link to="/cookie-policy">Cookie Policy</Link> | <Link to="/react-consulting">React Consulting</Link><br />
      &copy; 2020, Hot Extramusicality, Inc.
    </div>
  )
}

export default SiteFooter
