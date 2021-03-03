import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { movieRequest, WebMovie, IWebMovie } from '../index'

interface IProps {
  src: string | string[]

  frameRate?: number
  startClip?: number
  id?: string
  canStart?: boolean
  onStart?: () => void
}

function WebMoviePlayer({ children, src, frameRate, startClip, id, canStart, onStart }: PropsWithChildren<IProps>): ReactElement {
  const { movies } = useSelector((state: any) => ({
    movies: state.webMovie.movies,
  }))

  const dispatch = useDispatch()

  useEffect(function init() {
    dispatch(movieRequest(src))
  }, [])

  return (
    <div
      className="hem-web-movie-player"
      id={id}
    >
      <div className="hem-web-movie-screen">
        { movies.map((movie: IWebMovie) => (
          <WebMovie
            key={movie.id}
            movie={movie}
            frameRate={frameRate}
            startClip={startClip}
            canStart={canStart}
            onStart={onStart}
          >
            { children }
          </WebMovie>
        ))}
      </div>
    </div>
  )
}

export default WebMoviePlayer
