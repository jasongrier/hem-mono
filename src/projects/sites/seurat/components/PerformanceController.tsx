import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setCursorGroup } from '../store/actions'
import { uiLocked as uiLockedSel } from '../store/selectors'
import { CursorGroup } from '../store/types'

/**
 * Selector buttons
 * – Performance Type
 * –– Random
 * –– Up
 * –– Step
 * –– Code
 * – Mutually exclusive
 */

interface IProps {
  cursorGroup: CursorGroup
}

function PerformanceController({ cursorGroup: myCursorGroup }: IProps): ReactElement {
  const { active, uiLocked } = useSelector((state: RootState) => ({
    active: state.app.cursorGroup === myCursorGroup,
    uiLocked: uiLockedSel(state),
  }))

  const dispatch = useDispatch()

  return (
    <div
      className={`
        performance-controller
        performance-controller--${myCursorGroup}
        ${active ? 'performance-controller--active' : ''}
      `}
      onClick={() => {
        if (uiLocked) return
        dispatch(setCursorGroup(myCursorGroup)
      )}}
    >
      <div className="dial" />
      <div className="dial" />
      <div className="dial" />
      <div className="dial" />

      <div className="performance-controller__selectors">
        <button className="performance-controller__color-selector" />
        <button />
        <button />
        <button />
      </div>
    </div>
  )
}

export default PerformanceController
