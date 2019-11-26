const picker1 = new Picker()
const picker2 = new Picker()
const midiCh1 = new Midi().getChannel(1)
const midiCh2 = new Midi().getChannel(2)
const counter1 = new Counter()
const counter2 = new Counter()
const performer1 = new Performer()
const performer2 = new Performer()

let note1 = new Note()
let note2 = new Note()

counter1.onBeat(() => {
  if (note2.isOn()) return
  note1 = performer1.play(arp1.pickNote())
  midiCh1.sendNote(note1)
})

counter2.onBeat(() => {
  if (note1.isOn()) return
  note2 = performer2.play(arp2.pickNote())
  midiCh2.sendNote(note2)
})

async function loop() {
  arp1.setNotes([1, 2, 3, 4])
  arp2.setNotes([1, 2, 3, 4])

  counter1.setSpeed(64)
  counter2.setSpeed(32)

  !counter1.isStarted() && counter1.start()
  !counter2.isStarted() && counter2.start()

  await pause(1000)

  loop()
}

async function composition() {
  await pause(1000)

  counter1.start()
  counter2.start()

  await pause(1000)

  counter1.setSpeed(64)
  counter2.setSpeed(32)

  await pause(1000)

  counter1.setSpeed(32)
  counter2.setSpeed(64)
}

composition()

// Basics
// Counter
//   setSpeed // number
//   onBeat // Function
//   isStarted

// Pause
//   for // number

// Picker
//   setNotes // Note[]
//   pickNote

// Note
//   play
//   setDuration
//   setVelocity
//   isOn

// Chord
//   setNotes // Note | number | Note[] | number
//   setDuration // number
//   setVelocity // number
//   isOn // boolean

// Performer
//   play // Note => Note
//   setBarLength // number
//   setMode // 'random' | number | number[] | Function

// SoundBank
//   fetch // string
//   onReady // Function

// // I/O
// Midi
//   setChannel // number
//   send // Note | Note[]
//   receive // Note | Note[]

// Sampler
//   setSoundBank // SoundBank
//   send // Note

// // UI
// Button
//   note // Note
//   on
//   off

// Demos
// – Basics
// –– Counter
// –– Note
// –– Picker
// –– Chord
// – I/O
// –– Midi
// –– Sampler
// – UI
// –– Button
// – Exercises
// –– Chord book
// –– Mute Groups
// –– Seurat
// –– Trills
// –– Live Coding Loop
// –– Timeline-based Composition with async/await
