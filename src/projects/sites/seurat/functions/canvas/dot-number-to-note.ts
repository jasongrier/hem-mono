// Technically, these note assignments are meaningless, we just start
const map = [
  'C2',
  'C#2',
  'D2',
  'D#2',
  'E2',
  'F2',
  'F#2',
  'G2',
  'G#2',
  'A2',
  'A#2',
  'B2',
  'C3',
  'C#3',
  'D3',
  'D#3',
]

function dotNumberToNote(dotNumber: number) {
  return map[dotNumber]
}

export default dotNumberToNote
