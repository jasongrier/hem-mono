import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import Canvas from './Canvas'
import Palette from './Palette'
import { useClock } from '../hooks'
import { DO_OPENING_SEQUENCE, WITH_DIVOT } from '../config'
import { dotNumberToNote, flashDots } from '../functions/canvas'
import { setupBuiltInSounds } from '../functions/sounds'
import { pickNoteRandom } from '../functions/performance'
import { IDot } from '../store/types'
import { playOpeningSequence, setMasterVolume } from '../store/actions'
import CodeEditor from './CodeEditor'
import DeviceControls from './DeviceControls'
import IconButton from './IconButton'
import { noop } from 'lodash'
import Dial from './Dial'

// const samplers: any = setupBuiltInSounds()

interface IActiveDot extends IDot {
  index: number
}

interface IActiveDots {
  blue: IActiveDot[]
  red: IActiveDot[]
  white: IActiveDot[]
  yellow: IActiveDot[]
}

let activeNotesProxy: IActiveDots
let playingProxy: boolean // TODO: How to prevent values getting frozen into a hook??

function Seurat(): ReactElement {
  const { dots, playing, on } = useSelector((state: RootState) => ({
    dots: state.app.canvases[state.app.currentCanvasIndex].dots,
    playing: state.app.playing,
    on: state.app.on,
  }))

  const dispatch = useDispatch()

  if (DO_OPENING_SEQUENCE) {
    useEffect(() => {
      dispatch(playOpeningSequence())
    }, [])
  }

  useEffect(() => {
    activeNotesProxy = dots.reduce((acc: any, { cursorGroup, sound }: IDot, index: number) => {
      if (cursorGroup !== 'none') {
        acc[cursorGroup].push({ index, sound })
      }
      return acc
    }, {
      white: [],
      red: [],
      yellow: [],
      blue: [],
    })
  }, [dots])

  useEffect(() => { playingProxy = playing }, [playing])

  useClock('web', () => {
    // const blueNote = pickNoteRandom(activeNotesProxy.blue)
    // const redNote = pickNoteRandom(activeNotesProxy.red)
    // const whiteNote = pickNoteRandom(activeNotesProxy.white)
    // const yellowNote = pickNoteRandom(activeNotesProxy.yellow)

    // const dotsToTrigger: IActiveDot[] = []

    // if (null !== whiteNote) {
    //   dotsToTrigger.push(whiteNote.note)
    // }

    // if (null !== redNote) {
    //   dotsToTrigger.push(redNote.note)
    // }

    // if (null !== yellowNote) {
    //   dotsToTrigger.push(yellowNote.note)
    // }

    // if (null !== blueNote) {
    //   dotsToTrigger.push(blueNote.note)
    // }

    // if (dotsToTrigger.length && playingProxy) {
    //   const dotNumbers = dotsToTrigger.map(dot => dot.index)
    //   flashDots(dotNumbers)
    //   samplers[sound].play(dotNumbers.map(dotNumberToNote)) // TODO: Play the sound assigned to the dot, not the canvas' sound
    // }
  })

  return (
    <div className={`
      seurat
        ${WITH_DIVOT ? 'seurat--with-divot' : ''}
        seurat--device-${on ? 'on' : 'off'}
    `}>
      <Palette />
      <Canvas />
      <DeviceControls />
      <Dial
        className="master-volume"
        color="#d8d8d8" // TODO: Standardize colors by keeping color vars in a place both TS and (vanilla) CSS can access them
        onChange={noop} // TODO: Set in real time directly on the audio API
        onChangeDone={(value) => {
          dispatch(setMasterVolume(value))
        }}
        onPress={noop}
        size={36}
        value={0.75}
      />
      <CodeEditor />
    </div>
  )
}

export default Seurat
