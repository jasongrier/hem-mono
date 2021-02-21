import { FORCE_PLACEMATS } from '../config'
import { IContentItem } from '../modules/core/content'

function usePlacemats(contentItem: IContentItem) {
  if (FORCE_PLACEMATS) {
    return true
  }

  return !contentItem.images[0]
}

export default usePlacemats
