import React, { ReactElement, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { IPoem } from '../store/types'
import { setProcessNoteOpen } from '../store/actions'

interface IProps {
  match: any
}

let proxyProcessNoteOpen: boolean = false // TODO: How not to "freeze in" changing state values in event callbacks?

function ProcessNote({ match }: IProps): ReactElement {
  const { processNoteOpen, poems } = useSelector((state: RootState) => ({
    processNoteOpen: state.app.processNoteOpen,
    poems: state.app.poems,
  }))

  const poem = poems.find((poem: IPoem) => {
    if (!match || !match.params || !match.params.slug) return false
    return poem.slug === match.params.slug
  })

  const dispatch = useDispatch()

  const node = useRef(null)

  function handleEsc(evt: any) {
    if (evt.keyCode === 27) {
      dispatch(setProcessNoteOpen(false))
    }
  }

  function handleClickOutside(evt: any) {
    if (!proxyProcessNoteOpen) return
    if ((node as any).current.contains(evt.target)) return

    dispatch(setProcessNoteOpen(false))
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleEsc)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    proxyProcessNoteOpen = processNoteOpen
  }, [processNoteOpen])

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

      <div 
        className="process-note__content"
        dangerouslySetInnerHTML={{__html: poem && poem.processNote}}
      />
    </div>
  )
}

export default ProcessNote
