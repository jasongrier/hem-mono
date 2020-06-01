import {MidiMessage, MidiTimingCodes, IOnMessageHandler} from './virtual-midi'

class MidiLoop {
  private pulsesPerBeat: number
  private beatCount: number
  private onStart:() => void
  private onBeat: (beat: number) => void
  private onStop: () => void

  constructor(onBeat, pulsesPerBeat?, onStart?, onStop?) {
    this.pulsesPerBeat = pulsesPerBeat || 24
    this.beatCount = 0
    this.onStart = onStart
    this.onBeat = onBeat
    this.onStop = onStop
  }

  public setPulsesPerBeat = (pulsesPerBeat) => {
    this.pulsesPerBeat = pulsesPerBeat
    this.beatCount = 0
  }

  public evalLoop: IOnMessageHandler = (deltaTime: number, message: MidiMessage) => {
    switch (message[0]) {
      case MidiTimingCodes.START:
      case MidiTimingCodes.CONTINUE:
        this.beatCount = 0
        this.onStart && this.onStart()
        break

      case MidiTimingCodes.PULSE:
        if (this.beatCount === 1) {
          this.beatCount ++
          this.onBeat(this.beatCount)
        }

        else if (this.beatCount === this.pulsesPerBeat) {
          this.beatCount = 1
        }

        else {
          this.beatCount ++
        }
        break

      case MidiTimingCodes.STOP:
        this.onStop && this.onStop()
        break
    }
  }
}

export {MidiLoop}