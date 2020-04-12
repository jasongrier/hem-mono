import {
  SET_CURRENT_CONTENT_ITEM,

  Action,
  IContentItem,
} from './index'

const setCurrentContentItem = (contentItem: IContentItem): Action => ({
  type: SET_CURRENT_CONTENT_ITEM,
  payload: contentItem,
})

export {
  setCurrentContentItem,
}
