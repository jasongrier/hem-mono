import { ICanvas, CanvasSize, IDot } from '../../store/types'

function createCanvas(
  defaultSound: string,
  size: CanvasSize,
  name?: string,
): ICanvas {
  const defaultDot: IDot = {
    cursorGroup: 'empty',
    sound: defaultSound,
  }

  return {
    defaultSound,
    dots: new Array(size).fill(defaultDot),
    name: name || defaultSound,
  }
}

export default createCanvas
