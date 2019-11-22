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
import { playOpeningSequence, setMainVolume } from '../store/actions'
import DeviceControls from './DeviceControls'
import IconButton from './IconButton'
import { noop } from 'lodash'
import Dial from './Dial'
import InstrumentLogo from './InstrumentLogo'

// const samplers: any = setupBuiltInSounds()

interface IActiveDot extends IDot {
  index: number
}

interface IActiveDots {
  a: IActiveDot[]
  b: IActiveDot[]
  c: IActiveDot[]
}

let activeNotesProxy: IActiveDots
// TODO: How to prevent values getting frozen into a hook??
let playingProxy: boolean

function Seurat(): ReactElement {
  const { dots, mainVolume, playing, on } = useSelector((state: RootState) => ({
    dots: state.app.canvases[state.app.currentCanvasIndex].dots,
    mainVolume: state.app.mainVolume,
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
      a: [],
      b: [],
      c: [],
    })
  }, [dots])

  useEffect(() => { playingProxy = playing }, [playing])

  useClock(() => {
    // const noteA = pickNoteRandom(activeNotesProxy.a)
    // const noteB = pickNoteRandom(activeNotesProxy.b)
    // const noteC = pickNoteRandom(activeNotesProxy.c)

    // const dotsToTrigger: IActiveDot[] = []

    // if (null !== noteA) {
    //   dotsToTrigger.push(noteA.note)
    // }

    // if (null !== noteB) {
    //   dotsToTrigger.push(noteB.note)
    // }

    // if (null !== noteC) {
    //   dotsToTrigger.push(noteC.note)
    // }

    // if (dotsToTrigger.length && playingProxy) {
    //   const dotNumbers = dotsToTrigger.map(dot => dot.index)
    //   flashDots(dotNumbers)
    // TODO: Play the sound assigned to the dot, not the canvas' sound
    //   samplers[sound].play(dotNumbers.map(dotNumberToNote))
    // }
  })

  return (
    <div className={`
      seurat seurat--proportion-test
        ${WITH_DIVOT ? 'seurat--with-divot' : ''}
        seurat--device-${on ? 'on' : 'off'}
    `}>
      <Palette />
      <Canvas />
      <DeviceControls />
      <Dial
        className="main-volume-dial"
        // TODO: Standardize colors by keeping color vars in a place both TS and (vanilla) CSS can access them
        color="#d8d8d8"
        onChange={noop}
        onChangeDone={value => {
          dispatch(setMainVolume(value))
        }}
        onPress={noop}
        size={35}
        value={mainVolume}
      />
    </div>
  )
}

export default Seurat
