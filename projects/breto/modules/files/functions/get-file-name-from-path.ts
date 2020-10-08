import { last } from 'lodash'

function getFileNameFromPath(path: string) {
  return last(path.split('/'))
}

export default getFileNameFromPath
