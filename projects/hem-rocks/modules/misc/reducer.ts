import { AnyAction } from 'redux'
import {
  IState,
} from './index'

function createLogo(logoComponentName, hoverColor, linkTo, title, tipContent, transform) {
  return {
    featured: true,
    logoComponentName,
    hoverColor,
    linkTo,
    tipContent,
    title,
    transform,
  }
}

const projectLogos = [
  createLogo('MidstLogo', '#FF91AF', '/midst', 'Midst',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse justo enim, pharetra mattis pretium vitae, pharetra vitae orci. Ut sit amet iaculis dui.</p><p>Suspendisse posuere nulla hendrerit lectus feugiat imperdiet. Nulla eu hendrerit ipsum. Pellentesque ac dictum diam, sed imperdiet augue. Phasellus sagittis nisl sit amet purus ultricies scelerisque.</p>',
  'translateX(-1px)'),

  createLogo('SoundLibraryLogo', '#0471a3', '/sound-library', 'Sound Library',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse justo enim, pharetra mattis pretium vitae, pharetra vitae orci. Ut sit amet iaculis dui.</p><p>Suspendisse posuere nulla hendrerit lectus feugiat imperdiet. Nulla eu hendrerit ipsum. Pellentesque ac dictum diam, sed imperdiet augue. Phasellus sagittis nisl sit amet purus ultricies scelerisque.</p>',
  'scale(.7)'),

  createLogo('SeuratLogo', '#a30473', '/seurat', 'Seurat',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse justo enim, pharetra mattis pretium vitae, pharetra vitae orci. Ut sit amet iaculis dui.</p><p>Suspendisse posuere nulla hendrerit lectus feugiat imperdiet. Nulla eu hendrerit ipsum. Pellentesque ac dictum diam, sed imperdiet augue. Phasellus sagittis nisl sit amet purus ultricies scelerisque.</p>',
  'scale(.6)'),
]

const initialState: IState = {
  projects: projectLogos,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    default: {
      return state
    }
  }
}

export {
  initialState,
  reducer,
}
