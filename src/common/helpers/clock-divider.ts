let ticksPerBeat = 12 // 6
let tickCount = 0

function clockDivider(onBeat: () => void) {
  if (tickCount === 1) {
    tickCount ++
    onBeat()
  }

  else if (tickCount === ticksPerBeat) {
    tickCount = 1
  }

  else {
    tickCount ++
  }
}

function setTempo(tempo: number) {
  ticksPerBeat = tempo
}

export { clockDivider, setTempo }
