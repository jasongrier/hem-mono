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

  testMode() {
    const notes = new Array(100).fill(0)
    notes[Math.floor(Math.random() * 100)] = 1
    return notes
  }
}

module.exports = Sequencer
