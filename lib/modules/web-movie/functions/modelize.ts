import { IWebMovie, IWebMovieClip, IWebMovieFrame } from '../index'

function modelize(src: string, movieInfo: any): IWebMovie {
  return {
    clips: movieInfo.clips.map(clipInfo => ({
      frames: clipInfo.frameFileNames.map(fileName => ({
        loaded: false,
        fileName,
      } as IWebMovieFrame)),
      name: clipInfo.name,
    } as IWebMovieClip)),
    slug: movieInfo.slug,
    src,
    title: movieInfo.title,
  }
}

export default modelize
