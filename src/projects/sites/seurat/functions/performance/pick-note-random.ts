import { INotePickerReturn } from './sequencer'

function pickNoteRandom(notes: any[]): INotePickerReturn {
  return notes.length ?
    notes[Math.round(Math.random() * (notes.length - 1))]
        : null
}

export default pickNoteRandom
