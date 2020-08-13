import { ITrack } from '../index'
import getNextTrack from './get-next-track'

function getPreviousTrack(state: any): ITrack | undefined {
  return getNextTrack(state, true)
}

export default getPreviousTrack
