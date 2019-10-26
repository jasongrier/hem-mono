import { ICanvas, IDot } from '../../store/types'

function createCanvas(
  name: string,
  sound?: string,
): ICanvas {
  const defaultDot: IDot = {
    cursorGroup: 'none',
    sound,
  }

  return {
    dots: new Array(64).fill(defaultDot),
    name,
  }
}

export default createCanvas
