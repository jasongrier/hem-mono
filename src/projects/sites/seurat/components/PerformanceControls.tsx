import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setCursorGroup, updateControl } from '../store/actions'
import { uiLocked as uiLockedSel } from '../store/selectors'
import { CursorGroup } from '../store/types'
import IconButton from './IconButton'
import SeuratDial from './SeuratDial'

interface IProps {
  cursorGroup: CursorGroup
}

function PerformanceControls({ cursorGroup: myCursorGroup }: IProps): ReactElement {
  const { active, codeEditorOpen, controls, on, uiLocked } = useSelector((state: RootState) => ({
    active: state.app.cursorGroup === myCursorGroup,
    codeEditorOpen: state.app.codeEditorOpen,
    controls: state.app.canvases[state.app.currentCanvasIndex].controls[myCursorGroup], // TODO: Make `currentCanvas` into a selector
    on: state.app.on,
    uiLocked: uiLockedSel(state),
  }))

  const dispatch = useDispatch()

  const { mutuallyExclusive, sequencerMode } = controls

  return (
    <div
      className={`
        performance-controller
        performance-controller--${myCursorGroup}
        ${active ? 'performance-controller--active' : ''}
      `}
      onMouseDown={() => {
        if (uiLocked) return
        dispatch(setCursorGroup(myCursorGroup))
      }}
    >
      <SeuratDial
        cursorGroup={myCursorGroup}
        label="spd"
        name="continuousControlA"
        disabled={uiLocked}
        value={controls.continuousControlA}
      />
      <SeuratDial
        cursorGroup={myCursorGroup}
        label="acc"
        name="continuousControlB"
        disabled={uiLocked}
        value={controls.continuousControlB}
      />
      <SeuratDial
        cursorGroup={myCursorGroup}
        label="thr"
        name="continuousControlC"
        disabled={uiLocked}
        value={controls.continuousControlC}
      />
      <SeuratDial
        cursorGroup={myCursorGroup}
        label="vol"
        name="continuousControlD"
        disabled={uiLocked}
        value={controls.continuousControlD}
      />

      <div className="performance-controller__selectors">
        <IconButton
          hidden={uiLocked}
          icon="seq-random"
          selected={!uiLocked && sequencerMode === 'random'}
          onClick={() => {
            if (uiLocked) return
            if (sequencerMode === 'random') return
            dispatch(updateControl(myCursorGroup, 'sequencerMode', 'random'))
          }}
        />
        <IconButton
          hidden={uiLocked}
          icon="seq-step"
          selected={!uiLocked && sequencerMode === 'step'}
          onClick={() => {
            if (uiLocked) return
            if (sequencerMode === 'step') return
            dispatch(updateControl(myCursorGroup, 'sequencerMode', 'step'))
          }}
        />
        <IconButton
          emphasised={codeEditorOpen === myCursorGroup}
          hidden={uiLocked}
          icon="seq-step-confined"
          selected={!uiLocked && sequencerMode === 'step-confined'}
          onClick={() => {
            if (uiLocked) return
            dispatch(updateControl(myCursorGroup, 'sequencerMode', 'step-confined'))
          }}
        />
        <IconButton
          hidden={uiLocked}
          icon="seq-mutually-exclusive"
          selected={!uiLocked && mutuallyExclusive}
          onClick={() => dispatch(updateControl(myCursorGroup, 'mutuallyExclusive', !mutuallyExclusive))}
        />
      </div>
    </div>
  )
}

export default PerformanceControls
