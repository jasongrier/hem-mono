import { IBoard, BoardSize } from '../store/types'

function newBoard(size: BoardSize): IBoard {
  return {
    dots: new Array(size).fill('empty'),
    size,
  }
}

export default newBoard
