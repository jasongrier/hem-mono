type Modes = 'across' | 'down' | 'random' | 'up'

interface IDimensions {
  x: number
  y: number
}

interface IOpts {
  dimensions: IDimensions
}

class Arpeggiator {
  private dimensions: IDimensions
  private mode: Modes
  private notes: boolean[]
  private numNotes: number
  private position: number

  constructor({ dimensions }: IOpts) {
    this.dimensions = dimensions
    this.mode = 'random'
    this.numNotes = this.dimensions.x * this.dimensions.y
    this.notes = this.fillNotes(this.numNotes)
    this.position = 0
  }

  public activateNote(note: number) {
    this.notes[note] = true
  }

  public deactivateNote(note: number) {
    this.notes[note] = false
  }

  public setMode(mode: Modes) {
    if (mode === this.mode) return

    if (
      this.mode === 'across'
      || mode === 'across'
    ) {
      this.position = 0
    }

    this.mode = mode
  }

  public getNotes(): number[] {
    if (this.mode === 'across') {
      return this.pickAcross()
    }

    else if (this.mode === 'down') {
      return this.pickDown()
    }

    else if (this.mode === 'random') {
      return this.pickRandom()
    }

    else if (this.mode === 'up') {
      return this.pickUp()
    }

    else {
      return []
    }
  }

  private fillNotes(numNotes: number): boolean[] {
    const notes: boolean[] = []

    for (let i = 0; i < numNotes; i ++) {
      notes.push(false)
    }

    return notes
  }

  private pickRandom(): number[] {
    this.position = Math.floor(Math.random() * this.notes.length - 1)
    return [this.position]
  }

  private pickUp(): number[] {
    return []
  }

  private pickDown(): number[] {
    return []
  }

  private pickAcross(): number[] {
    return []
  }
}

export default Arpeggiator
