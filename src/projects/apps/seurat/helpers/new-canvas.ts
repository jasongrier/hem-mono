import { ICanvas, BoardSize } from '../store/types'

function newCanvas(size: BoardSize): ICanvas {
  return {
    dots: new Array(size).fill('empty'),
    size,
  }
}

export default newCanvas
