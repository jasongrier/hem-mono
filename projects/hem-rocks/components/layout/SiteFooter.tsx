import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function SiteFooter(): ReactElement {
  return (
    <div className="site-footer">
      <Link to="about">About</Link> | <Link to="mailing-list">Mailing List</Link> | <Link to="contact">Contact</Link> | <Link to="support">Support</Link> | <a href="">Privacy Policy</a> | <a href="">Cookie Policy</a> | <a href="">Impressum</a><br />
      &copy; 2020, Hot Extramusicality, Inc. | Reichenberger Straße 176, 10999 Berlin, Deutschland | info@hem.rocks
    </div>
  )
}

export default SiteFooter
