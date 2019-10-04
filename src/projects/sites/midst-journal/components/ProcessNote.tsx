import React, { ReactElement, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setProcessNoteOpen } from '../store/actions'

function ProcessNote(): ReactElement {
  const { processNoteOpen } = useSelector((state: RootState) => ({
    processNoteOpen: state.app.processNoteOpen,
  }))

  const dispatch = useDispatch()

  const node = useRef(null)

  function handleEsc(evt: any) {
    if (evt.keyCode === 27) {
      dispatch(setProcessNoteOpen(false))
    }
  }

  function handleClick(evt: any) {
    if ((node as any).current.contains(evt.target)) {
      return
    }

    dispatch(setProcessNoteOpen(false))
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleEsc)
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.removeEventListener('mousedown', handleClick)
    };
  }, [])

  return (
    <div
      ref={node}
      className={'process-note ' + (processNoteOpen ? 'open' : '')}
    >
      <div
        className="close-process-note"
        onClick={() => dispatch(setProcessNoteOpen(false))}
      >
        x
      </div>
      PROCESS NOTE
    </div>
  )
}

export default ProcessNote
