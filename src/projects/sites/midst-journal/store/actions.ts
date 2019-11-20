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

  IPoem,
} from './types'

const loadPoemData = (poemIndex: number): any => // TODO: Should be: ThunkResult<void>. Why doesn't it work?
  async (dispatch: any, getState: any) => { // TODO: Above should be: ThunkResult<void>, then `any` is not needed here
    let poems = [].concat(getState().app.poems)

    const zip = (window as any).zip
    zip.workerScriptsPath = '/static-assets/website-assets/scripts/'

    try {
      const poem: IPoem = poems[poemIndex]
      const processNoteRaw = await $.get(`http://midst.press/static-assets/journal-assets/staging-authors/${poem.authorId}/${poem.authorId}.md`)
      const processNote = insane(marked(processNoteRaw), { allowedTags: ['h1', 'p', 'i', 'a', 'em', 'b', 'strong', 'img']})
      const zipTest = await fetch(`http://midst.press/static-assets/journal-assets/staging-authors/${poem.authorId}/${poem.poemId}.midst.zip`)
      const reader = new zip.BlobReader(await zipTest.blob())

      zip.createReader(reader, zipReader => {
        zipReader.getEntries(entries => {
          const writer = new zip.BlobWriter()
          entries[0].getData(writer, blob => {
            const reader = new FileReader()
            reader.addEventListener('loadend', (e: any) => {
              console.log(poem.poemId)
              const data = JSON.parse(e.srcElement.result)
              dispatch({ type: LOAD_POEM_DATA, payload: { poemId: poem.poemId, data, processNote }})
            })
            reader.readAsText(blob)
          })
        })
      }, err => {
        console.log(err)
      })
    }

    catch(err) {
      console.log(err)
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
