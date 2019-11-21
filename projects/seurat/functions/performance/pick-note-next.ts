import { INotePickerReturn } from './sequencer'

function pickNoteAfter(notes: any[], current: number): INotePickerReturn {
  current = (current < notes.length) ? current + 1 : 0
  return {
    metaData: { current },
    note: notes[current],
  }
}

export default pickNoteAfter
