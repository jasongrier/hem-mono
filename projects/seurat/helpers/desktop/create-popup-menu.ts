import {addRendererAppUtil} from 'projekt/lib/helpers/desktop'

export const createPopupMenu = (menu) => {
  addRendererAppUtil('openPopupMenu', menu.popup)
  addRendererAppUtil('closePopupMenu', menu.closePopup)
}