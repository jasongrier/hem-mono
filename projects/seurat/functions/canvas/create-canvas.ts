import { merge } from 'lodash'

// TODO: random-words @types
//@ts-ignore
import randomWords from 'random-words'
import { ICanvas, IControls, IDot, CursorGroup } from '../../store/types'

const randomWordsConfig = {
  exactly: 1,
  wordsPerString: 2,
  maxLength: 5,
}

function createCanvas(
  cursorGroup: CursorGroup,
  name: string,
  sound?: string,
): ICanvas {
  const defaultDot: IDot = {
    cursorGroup,
    sound,
  }

  const defaultPerformanceControls: IControls = {
    continuousControlA: 0.5,
    continuousControlB: 0.5,
    continuousControlC: 0.5,
    continuousControlD: 0.5,
    mutuallyExclusive: false,
    customScript: '',
    sequencerMode: 'random',
  }

  return {
    controls: {
      a: defaultPerformanceControls,
      b: defaultPerformanceControls,
      c: defaultPerformanceControls,
      none: defaultPerformanceControls,
    },
    dots: new Array(64).fill(defaultDot),
    name,
  }
}

export function createRandomCanvas(dots: boolean = true, name: boolean = true, sound: boolean = true) {
  return createCanvas(
    // TODO: This makes every single dot the same random color!
    dots ? ['a', 'b', 'c', 'none'][Math.floor(Math.random() * 3)] as CursorGroup : 'none',
    name ? randomWords(randomWordsConfig)[0].toUpperCase() : 'UNTITLED',
    // TODO: Sound impl.
    sound ? 'empty' : 'empty',
  )
}

export function createRandomCanvases(amount: number) {
  const canvases: ICanvas[] = []
  for (var i = 0; i < amount; i++) {
    canvases.push(createRandomCanvas(false))
  }
  return canvases
}

export default createCanvas
