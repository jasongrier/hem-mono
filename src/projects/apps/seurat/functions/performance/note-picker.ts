import { ITrackInput, ITrackOutput } from './sequencer'
import pickNoteNext from './pick-note-next'
import pickNoteRandom from './pick-note-random'

export interface INotePickerInput extends ITrackInput {
  step: number
}

function notePicker({
  divide = 1,
  notes,
  pickerType,
  prevNote,
  step,
  throttle = 100,
}: INotePickerInput): ITrackOutput {
  let value: any
  let silent = false

  if (throttle / 100 < Math.random()) {
    silent = true
  }

  if (divide % step) {
    silent = true
  }

  if (!silent) {
    switch (pickerType) {
      case 'next':
        value = pickNoteNext(notes, prevNote)

      case 'random':
        value = pickNoteRandom(notes)
    }
  }

  return value
}

export default notePicker
