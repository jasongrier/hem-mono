import { playerElementId } from '../index'

function getPlayerInstance(): HTMLAudioElement {
  // @ts-ignore
  return document.getElementById(playerElementId)
}

export default getPlayerInstance
