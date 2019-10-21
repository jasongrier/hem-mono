import pickNoteNext from './pick-note-next'
import pickNoteRandom from './pick-note-random'

export interface INotePickerReturn {
  metaData: any
  note: number
}

export interface ISequencerReturn extends INotePickerReturn {
  step: number
}

function sequencer(
  notes: any[],
  picker: 'random' | 'next',
  prevNote: number,
  step: number,
  divide: number = 1,
  throttle: number = 100,
): ISequencerReturn {
  let value: any
  let silent = false

  if (throttle / 100 < Math.random()) {
    silent = true
  }

  if (divide % step) {
    silent = true
  }

  if (!silent) {
    switch (picker) {
      case 'next':
        value = pickNoteNext(notes, prevNote)

      case 'random':
        value = pickNoteRandom(notes)
    }
  }

  value.step = step < 16 ? step + 1 : 1

  return value
}

export default sequencer
