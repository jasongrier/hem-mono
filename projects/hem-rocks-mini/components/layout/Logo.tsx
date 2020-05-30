import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { expandTopBar } from '../../modules/app'

function Logo(): ReactElement {
  const dispatch = useDispatch()

  return (
    <h1
      className="logo"
      onClick={() => dispatch(expandTopBar())}
    >
      <Link to="/">HEM</Link>
    </h1>
  )
}

export default Logo
