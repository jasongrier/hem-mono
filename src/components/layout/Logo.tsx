import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function Logo(): ReactElement {
  return (
    <h1 className="logo">
      <Link to="/">HEM</Link>
    </h1>
  )
}

export default Logo
