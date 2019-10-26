import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setCodeEditorOpen, setCursorGroup, updateControl } from '../store/actions'
import { uiLocked as uiLockedSel } from '../store/selectors'
import { CursorGroup } from '../store/types'
import IconButton from './IconButton'
import Dial from './Dial'

interface IProps {
  cursorGroup: CursorGroup
}

function PerformanceControls({ cursorGroup: myCursorGroup }: IProps): ReactElement {
  const { active, codeEditorOpen, controls, uiLocked } = useSelector((state: RootState) => ({
    active: state.app.cursorGroup === myCursorGroup,
    codeEditorOpen: state.app.codeEditorOpen,
    controls: state.app.canvases[state.app.currentCanvasIndex].controls[myCursorGroup], // TODO: Make `currentCanvas` into a selector
    uiLocked: uiLockedSel(state),
  }))

  const dispatch = useDispatch()

  const { customScript, mutuallyExclusive, sequencerMode } = controls

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
      <Dial
        controlled={false}
        onChange={() => {}}
        onChangeDone={() => {}}
        value={controls.continuousControlA}
      />
      <Dial
        controlled={false}
        onChange={() => {}}
        onChangeDone={() => {}}
        value={controls.continuousControlB}
      />
      <Dial
        controlled={false}
        onChange={() => {}}
        onChangeDone={() => {}}
        value={controls.continuousControlC}
      />
      <Dial
        controlled={false}
        onChange={() => {}}
        onChangeDone={() => {}}
        value={controls.continuousControlD}
      />

      <div className="performance-controller__selectors">
        <IconButton
          selected={sequencerMode === 'random'}
          icon="seq-random"
          onClick={() => dispatch(updateControl(myCursorGroup, 'sequencerMode', 'random'))}
        />
        <IconButton
          selected={sequencerMode === 'step'}
          icon="seq-step"
          onClick={() => dispatch(updateControl(myCursorGroup, 'sequencerMode', 'step'))}
        />
        <IconButton
          emphasised={codeEditorOpen === myCursorGroup}
          selected={sequencerMode === 'custom'}
          icon="seq-custom"
          onClick={() => {
            if (sequencerMode === 'custom') {
              dispatch(setCodeEditorOpen(codeEditorOpen === false ? myCursorGroup : false))
            }

            else {
              if (customScript === '') {
                dispatch(setCodeEditorOpen(myCursorGroup))
              }

              dispatch(updateControl(myCursorGroup, 'sequencerMode', 'custom'))
            }
          }}
        />
        <IconButton
          selected={mutuallyExclusive}
          icon="seq-mutually-exclusive"
          onClick={() => dispatch(updateControl(myCursorGroup, 'mutuallyExclusive', !mutuallyExclusive))}
        />
      </div>
    </div>
  )
}

export default PerformanceControls
