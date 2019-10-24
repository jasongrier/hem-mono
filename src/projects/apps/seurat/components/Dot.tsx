import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { updateDot, setDragging, setCursorMode } from '../store/actions' // TODO: Barrelise actions

// TODO: Move handlers to a helper file
// TODO: Bug when releasing outside a dot including outside the window; should be the same as releasing on a dot

interface IProps {
  dotNumber: number
}

function Dot({ dotNumber }: IProps): ReactElement {
  const { cursorGroup, cursorIsDragging, cursorMode, myCursorGroup, mySound } = useSelector((state: RootState) => ({
    cursorGroup: state.app.cursorGroup,
    cursorIsDragging: state.app.cursorIsDragging,
    cursorMode: state.app.cursorMode,
    myCursorGroup: state.app.canvases[state.app.currentCanvas].dots[dotNumber].cursorGroup,
    mySound: state.app.canvases[state.app.currentCanvas].dots[dotNumber].sound,
  }))

  const dispatch = useDispatch()

  function onMouseDown() {
    dispatch(setDragging(true))

    if (cursorMode === 'draw') {
      if (cursorGroup === myCursorGroup) {
        dispatch(updateDot({ dotNumber, cursorGroup: 'none', sound: mySound }))
        dispatch(setCursorMode('erase'))
      }

      else {
        dispatch(updateDot({ dotNumber, cursorGroup: cursorGroup, sound: mySound }))
      }
    }

    else {
      if (cursorGroup === myCursorGroup) {
        dispatch(updateDot({ dotNumber, cursorGroup: 'none', sound: mySound }))
      }
    }
  }

  function onMouseOver() {
    if (!cursorIsDragging) return

    if (cursorMode === 'draw' && cursorGroup !== myCursorGroup) {
      dispatch(updateDot({ dotNumber, cursorGroup: cursorGroup, sound: mySound }))
    }

    else if (cursorMode === 'erase' && cursorGroup === myCursorGroup) {
      dispatch(updateDot({ dotNumber, cursorGroup: 'none', sound: mySound }))
    }
  }

  function onMouseUp() {
    dispatch(setDragging(false))
    dispatch(setCursorMode('draw'))
  }

  return (
    <div
      className={`dot dot--group-${myCursorGroup}`}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onMouseUp={onMouseUp}
    />
  )
}

export default Dot
