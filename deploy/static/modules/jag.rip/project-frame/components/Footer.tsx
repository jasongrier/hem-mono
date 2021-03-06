import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function Footer(): ReactElement {
  return (
    <footer className="main-footer">
      <p>
        &copy; Jason Grier, 2021
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/general-content/filter/web-work">Web Work</Link>
        <Link to="/general-content/filter/blog">Blog</Link>
        <Link
          target="_blank"
          to="/bespoke-web-developer"
        >
          Bespoke Web Developer
        </Link>
        {/* <Link
          target="_blank"
          to="/react-javascript-consulting"
        >
          React Javascript Consulting
        </Link> */}
      </p>
    </footer>
  )
}

export default Footer
