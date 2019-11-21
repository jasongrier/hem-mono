import { ISound, CanvasSize } from '../../store/types'

function getSoundSize(sound: ISound) {
  return Object.keys(sound).length as CanvasSize
}

export default getSoundSize
