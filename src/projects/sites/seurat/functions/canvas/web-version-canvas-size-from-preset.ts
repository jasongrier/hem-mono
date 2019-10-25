import { WebVersionPreset, BoardSize } from '../store/types'

// TODO: Unify this with `web-version-samplers` and maybe use a JSON definition file
// rather than hardcoding it.
function webVersionBoardSizeFromPreset(type: WebVersionPreset): BoardSize {
  switch (type) {
    case 'amp':
      return 100
    case 'bells':
      return 16
    case 'drum':
      return 100
    case 'guitars':
      return 100
    case 'piano':
      return 100
    case 'radio':
      return 100
    case 'sax':
      return 100
    case 'turntable':
      return 100
    case 'violin':
      return 100
  }
}

export default webVersionBoardSizeFromPreset