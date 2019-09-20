import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCursorGroup } from '../store/actions'
import { RootState } from '../store'

function ColorPicker(): ReactElement {
  const { cursorGroup } = useSelector((state: RootState) => ({
    cursorGroup: state.app.cursorGroup
  }))

  const dispatch = useDispatch()

  return (
    <div className="color-picker">
      <div className={` color-picker__color color-picker__color--white
        ${cursorGroup === 'white' ? 'color-picker__color--active' : ''}`}
        onClick={() => dispatch(setCursorGroup('white'))}
      />
      <div className={` color-picker__color color-picker__color--red
        ${cursorGroup === 'red' ? 'color-picker__color--active' : ''}`}
        onClick={() => dispatch(setCursorGroup('red'))}
      />
      <div className={` color-picker__color color-picker__color--yellow
        ${cursorGroup === 'yellow' ? 'color-picker__color--active' : ''}`}
        onClick={() => dispatch(setCursorGroup('yellow'))}
      />
      <div className={` color-picker__color color-picker__color--blue
        ${cursorGroup === 'blue' ? 'color-picker__color--active' : ''}`}
        onClick={() => dispatch(setCursorGroup('blue'))}
      />
    </div>
  )
}

export default ColorPicker
