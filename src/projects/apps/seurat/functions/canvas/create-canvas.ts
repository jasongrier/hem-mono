import { ICanvas, IDot } from '../../store/types'

function createCanvas(
  defaultSound: string,
  name?: string,
): ICanvas {
  const defaultDot: IDot = {
    cursorGroup: 'none',
    sound: defaultSound,
  }

  return {
    defaultSound,
    dots: new Array(64).fill(defaultDot),
    name: name || defaultSound,
  }
}

export default createCanvas
