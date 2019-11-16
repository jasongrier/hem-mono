import generateImageSequenceUrls from './generate-image-sequence-urls'
import { IMovieSpec } from '../components/Theater'

function formatMovieSpecs(rawMovieSpecs: IMovieSpec[]) {
  return rawMovieSpecs.map(({
    frameSrc: {
      ext,
      name,
      sequenceEndNumber,
      sequenceStartNumber,
    },
    movieProps = {},
  }) => ({
    name,
    movieProps,
    frames: generateImageSequenceUrls(
      `http://hem.rocks/studio-assets/films/frames/${name}/IMG_`,
      sequenceEndNumber,
      ext,
      sequenceStartNumber,
    ),
  }))
}

export default formatMovieSpecs
