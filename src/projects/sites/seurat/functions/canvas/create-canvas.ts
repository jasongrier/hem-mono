import { ICanvas, IControls, IDot, IGroupControls } from '../../store/types'

function createCanvas(
  name: string,
  sound?: string,
): ICanvas {
  const defaultDot: IDot = {
    cursorGroup: 'none',
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
      blue: defaultPerformanceControls,
      none: defaultPerformanceControls,
      red: defaultPerformanceControls,
      white: defaultPerformanceControls,
      yellow: defaultPerformanceControls,
    },
    dots: new Array(64).fill(defaultDot),
    name,
  }
}

export default createCanvas
