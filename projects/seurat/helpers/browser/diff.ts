import {get, isEqual} from 'lodash'

export const diff = (map, coll, nextColl) => {

  for (const path of map) {
    if (!isEqual(get(coll, path), get(nextColl, path))) {
      return true
    }
  }

  return false
}

export const diffComponent = (map, instance, nextProps, nextState) => {

  if (map[0] === '*') {
    return true
  }

  if (map[0] === '-') {
    return false
  }

  if (diff(map, instance.props, nextProps) === true) {
    return true
  }

  if (diff(map, instance.state, nextState) === true) {
    return true
  }

  return false
}