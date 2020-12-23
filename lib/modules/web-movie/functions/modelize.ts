import uuid from 'uuid/v1'
import { IWebMovie, IWebMovieClip, IWebMovieFrame } from '../index'

function modelize(src: string, movieInfo: any): IWebMovie {
  let path = src.split('/')

  path.pop()

  return {
    clips: movieInfo.clips.map(clipInfo => ({
      frames: clipInfo.frameFileNames.map(fileName => ({
        id: uuid(),
        loaded: false,
        src: `${path.join('/')}/clips/${clipInfo.name}/${fileName}`,
      } as IWebMovieFrame)),
      id: uuid(),
      loaded: false,
      name: clipInfo.name,
    } as IWebMovieClip)),
    id: movieInfo.id,
    loaded: false,
    slug: movieInfo.slug,
    src,
    title: movieInfo.title,
  }
}

export default modelize
