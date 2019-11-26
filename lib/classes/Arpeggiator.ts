export type Mode = 'down' | 'random' | 'up'

class Arpeggiator {
  private mode: Mode = 'random'
  private notes: boolean[] = []
  private position: number = 0
  private size: number = 16

  constructor(size: number = 16, mode: Mode = 'random') {
    this.mode = mode
    this.size = size
    this.notes = new Array(this.size).fill(false)
  }

  private pickRandom(): number[] {
    const activeNotes = this.getActiveNotes()
    const note = activeNotes[Math.floor(Math.random() * activeNotes.length)]
    return [note]
  }

  private pickUp(): number[] {
    const activeNotes = this.getActiveNotes()
    this.position = this.position < activeNotes.length ? this.position + 1 : 1
    return [activeNotes[this.position - 1]]
  }

  private pickDown(): number[] {
    const activeNotes = this.getActiveNotes()
    this.position = this.position > 1 ? this.position - 1 : activeNotes.length
    return [activeNotes[this.position - 1]]
  }

  private getActiveNotes() {
    const activeNotes = []

    for (let a = 0; a < this.notes.length; a ++) {
      if (this.notes[a]) {
        activeNotes.push(a + 1)
      }
    }

    return activeNotes
  }

  public getNotes() {
    return this.notes
  }

  public reset() {
    this.position = 0
  }

  public setMode(mode: Mode) {
    this.mode = mode
  }

  public activateNote(note: number) {
    this.notes[note - 1] = true
  }

  public deactivateNote(note: number) {
    this.notes[note - 1] = false
  }

  public pickNotes(): number[] {
    if (this.mode === 'down') {
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
}

export default Arpeggiator
