const ticksPerBeat = 48
let tickCount = 0

function clockDivider(onBeat: (tickCount: number) => void) {
  if (tickCount === 1) {
    tickCount ++
    onBeat(tickCount)
  }

  else if (tickCount === ticksPerBeat) {
    tickCount = 1
  }

  else {
    tickCount ++
  }
}

export default clockDivider
