// let ticksPerBeat = 48 // 6
// let tickCount = 0

// function clockDivider(onBeat: () => void) {
//   if (tickCount === 1) {
//     tickCount ++
//     onBeat()
//   }

//   else if (tickCount === ticksPerBeat) {
//     tickCount = 1
//   }

//   else {
//     tickCount ++
//   }
// }

// function setTempo(tempo: number) {
//   ticksPerBeat = tempo
// }

// export { clockDivider, setTempo }

class ClockDivider {
  private ticksPerBeat: number = 48 // 6
  private tickCount: number = 0

  constructor(tickCount?: number,  ticksPerBeat?: number) {
    this.tickCount = tickCount ? tickCount : this.tickCount
    this.ticksPerBeat = ticksPerBeat ? ticksPerBeat : this.ticksPerBeat
  }

  public onTick(onTickCallback: () => void) {
    if (this.tickCount === 1) {
      console.log('it works')
      onTickCallback()
      this.tickCount ++
    }

    else if (this.tickCount === this.ticksPerBeat) {
      this.tickCount = 1
    }

    else {
      this.tickCount ++
    }
  }

  public setTempo(tempo: number) {
    this.ticksPerBeat = tempo
  }
}

export default ClockDivider
