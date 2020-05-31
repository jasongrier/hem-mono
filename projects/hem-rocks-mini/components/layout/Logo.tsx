import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMegaNavOpen } from '../../modules/app'
import { RootState } from '../../index'

function Logo(): ReactElement {
  const { megaNavOpen } = useSelector((state: RootState) => ({
    megaNavOpen: state.app.megaNavOpen,
  }))

  const dispatch = useDispatch()

  return (
    <h1
      className="logo"
      onClick={() => {
        if (megaNavOpen) return
        dispatch(setMegaNavOpen(true))
      }}
    >
      HEM
    </h1>
  )
}

export default Logo
