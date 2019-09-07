class Sequencer {
  constructor() {
    this.mode = 'test'
    this.activatedNotes = []
  }

  getNotes() {
    return this[`${this.mode}Mode`]()
  }

  setActivatedNotes(activatedNotes) {
    this.activatedNotes = activatedNotes
  }

  setMode(mode) {
    this.mode = mode
  }

  randomIndex(length) {
    return Math.floor(Math.random() * length)
  }

  testMode() {
    const notes = new Array(100).fill(0)
    notes[randomIndex(100)] = 1
    return notes
  }

  randomMode() {
    return this.activatedNotes[randomIndex(this.activatedNotes.length)]
  }
}

module.exports = Sequencer
