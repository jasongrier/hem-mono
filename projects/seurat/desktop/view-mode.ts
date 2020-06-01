import {getSingleWindowAppMainWindow} from 'projekt/lib/helpers/desktop'

let slidersOpen = false

const toggleSliders = () => {
  slidersOpen = !slidersOpen
  getSingleWindowAppMainWindow().setSize(slidersOpen ? 490 : 390, 390, true)
}

export {toggleSliders}