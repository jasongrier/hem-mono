const Clock = require('../../../../common/workers/Clock')
const Sequencer = require('../classes/Sequencer')

const sequencer = new Sequencer()

process.on('set-activated-notes', sequencer.setActivatedNotes)

const clock = new Clock(() => {
  process.send({ type: 'beat', data: sequencer.getNotes() })
})

clock.start()
