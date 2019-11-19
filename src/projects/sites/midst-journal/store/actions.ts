import arrayMove from 'array-move'
import { AnyAction } from 'redux'
import $ from 'jquery'
//@ts-ignore
import marked from 'marked' // TODO: Type def file
//@ts-ignore
import insane from 'insane' // TODO: Type def file
import {
  LOAD_POEM_DATA,
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,
} from './types'

const loadPoemData = (firstPoemIndex: number): any => // TODO: Should be: ThunkResult<void>. Why doesn't it work?
  async (dispatch: any, getState: any) => { // TODO: Above should be: ThunkResult<void>, then `any` is not needed here
    let poems = [].concat(getState().app.poems)
    poems = arrayMove(poems, firstPoemIndex, 0)

    for (let i = 0; i < poems.length; i++) {
      try {
        // TODO: Gzip these on the server
        const poem = poems[i]
        // TODO: Remove jQuery dependency
        // TODO: This needs to be non-blocking!!!
        const data = await $.getJSON(`http://midst.press/static-assets/journal-assets/staging-authors/${poem.authorId}/${poem.poemId}.midst`)
        const processNoteRaw = await $.get(`http://midst.press/static-assets/journal-assets/staging-authors/${poem.authorId}/${poem.authorId}.md`)
        const processNote = insane(marked(processNoteRaw), { allowedTags: ['h1', 'p', 'i', 'a', 'em', 'b', 'strong', 'img']})
        dispatch({ type: LOAD_POEM_DATA, payload: { poemId: poem.poemId, data, processNote }})
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
