import { AnyAction } from 'redux'
import $ from 'jquery'
import {
  LOAD_POEM_DATA,
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,
} from './types'

const loadPoemData = (): any => // TODO: Should be: ThunkResult<void>. Why doesn't it work?
  async (dispatch: any, getState: any) => { // TODO: Above should be: ThunkResult<void>, then `any` is not needed here
    const poems = getState().app.poems

    for (let i = 0; i < poems.length; i++) {
      try {
        // TODO: Gzip these on the server
        const poem = poems[i]
        // TODO: Remove jQuery dependency
        // TODO: This needs to be non-blocking!!!
        const data = await $.getJSON(`http://midst.press/static-assets/journal-assets/dev-authors/${poem.authorId}/${poem.poemId}.midst`)
        dispatch({ type: LOAD_POEM_DATA, payload: { poemId: poem.poemId, data }})
      }

      catch(err) {
        console.log(err)
      }
    }
  }

const setMobileNavOpen = (mobileNavOpen: boolean): AnyAction => ({
  type: SET_MOBILE_NAV_OPEN,
  payload: mobileNavOpen,
})

const setProcessNoteOpen = (processNoteOpen: boolean): AnyAction => ({
  type: SET_PROCESS_NOTE_OPEN,
  payload: processNoteOpen,
})

export {
  loadPoemData,
  setMobileNavOpen,
  setProcessNoteOpen,
}
