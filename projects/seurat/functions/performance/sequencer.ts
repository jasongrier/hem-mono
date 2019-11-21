import notePicker, { INotePickerInput } from './note-picker'

export interface ITrackInput {
  divide: number
  notes: any[]
  pickerType: 'random' | 'next'
  prevNote: any
  throttle: number
}

export interface ITrackOutput {
  metaData: any
  note: any
}

export interface ISequencerOutput {
  step: number
  tracks: ITrackOutput[]
}

function sequencer(step: number, trackInputs: ITrackInput[]): ISequencerOutput {
  const tracks: ITrackOutput[] = trackInputs.map(trackInput => {
    const notePickerInput: INotePickerInput = {
      step,
      ...trackInput,
    }
    return notePicker(notePickerInput)
  })

  return {
    step: step < 16 ? step + 1 : 1,
    tracks,
  }
}

export default sequencer
