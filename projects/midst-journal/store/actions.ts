import { AnyAction } from 'redux'
import $ from 'jquery'
// TODO: Type def file
//@ts-ignore
import marked from 'marked'
// TODO: Type def file
//@ts-ignore
import insane from 'insane'
import {
  LOAD_POEM_DATA,
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,

  IPoem,
} from './types'

const cdnUrl = process.env.CDN_URL + '/midst-journal/authors/staging'

// TODO: Should be: ThunkResult<void>. Why doesn't it work?
const loadPoemData = (poemIndex: number): any =>
  // TODO: Above should be: ThunkResult<void>, then `any` is not needed here
  async (dispatch: any, getState: any) => {
    let poems = [].concat(getState().app.poems)

    const zip = (window as any).zip
    zip.workerScriptsPath = '/workers/'

    try {
      const poem: IPoem = poems[poemIndex]
      const processNoteRaw = await $.get(`${cdnUrl}/${poem.authorId}/${poem.authorId}.md`)
      const processNote = insane(marked(processNoteRaw), { allowedTags: ['h1', 'p', 'i', 'a', 'em', 'b', 'strong', 'img']})
      const zipTest = await fetch(`${cdnUrl}/${poem.authorId}/${poem.poemId}.midst.zip`)
      const reader = new zip.BlobReader(await zipTest.blob())

      zip.createReader(reader, zipReader => {
        zipReader.getEntries(entries => {
          const writer = new zip.BlobWriter()
          entries[0].getData(writer, blob => {
            const reader = new FileReader()
            reader.addEventListener('loadend', (e: any) => {
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
