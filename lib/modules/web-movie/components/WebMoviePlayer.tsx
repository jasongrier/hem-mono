import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { movieRequest, WebMovie } from '../index'

interface IProps {
  src: string | string[]
}

function WebMoviePlayer({ src }: IProps): ReactElement {
  const { movies } = useSelector((state: any) => ({
    movies: state.webMovie.movies,
  }))

  const dispatch = useDispatch()

  useEffect(function init() {
    dispatch(movieRequest(src))
  }, [])

  return (
    <div className="hem-web-movie-player">
      <div className="hem-web-movie-screen">
        { movies.map(movie => (
          <WebMovie
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  )
}

export default WebMoviePlayer
