import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import Board from './Board'
import ClockReceiver from './ClockReceiver'
import Palette from './Palette'
import { toggleDrawer } from '../store/actions' // TODO: Barrelise actions

function App(): ReactElement {
  const { drawerOpen } = useSelector((state: RootState) => ({
    drawerOpen: state.app.drawerOpen,
  }))

  const dispatch = useDispatch()

  return (
    <div className={`hem-application ${drawerOpen ? ' drawer-open' : ''}`}>
      <div className="drawer">
        <Palette />
      </div>
      <Board />
      <ClockReceiver />
      <div
        className="palette-toggle"
        onClick={() =>  dispatch(toggleDrawer())}
      />
      {/* <div className="palette-toggles">
        <button className="active"></button>
        <button></button>
        <button></button>
      </div> */}
    </div>
  )
}

export default App
