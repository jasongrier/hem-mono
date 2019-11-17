import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Theater , { IMovieSpec } from '../../components/Theater' // TODO: Barrel file (all projects)

interface IProps {
  match: any
}

const tree: IMovieSpec[] = [
  {
    frameSrc: {
      diff: [36.66,36.09,36.06,35.79,35.92,35.17,35.51,35.31,34.90,34.83,34.87,34.60,34.20,33.26,33.69,33.29,32.51,31.72,31.26,30.61,31.04,30.44,30.61,30.22,30.15,29.72,29.86,28.99,28.12,27.95,27.82,27.12,27.44,28.00,27.02,26.39,26.43,26.52,26.63,26.84,26.52,27.23,27.37,27.41,27.91,28.04,27.60,27.03,26.39,25.57,24.83,25.34,25.29,24.82,25.22,24.81,24.80,23.06,22.21,24.92,21.84,18.65,0.00,10.83,12.78,15.15,18.36,21.79,25.33,27.59,29.97,31.21,33.45,31.64,31.41,35.43,40.33,41.28,41.11,40.12,39.44,39.27,39.88,40.69,41.34,41.14,40.98,44.85,46.15,41.43,37.71,36.76,35.54,36.84,39.29,38.16,37.18,35.94,35.40,33.70,33.75,34.27,35.17,33.30,34.78,37.15,37.05,36.82,35.95,36.47,37.32,37.73,37.82,37.19,34.64,32.17,31.28,31.19,31.98,32.61,37.21,36.58,36.71,36.55,37.48,38.44],
      ext: 'jpeg',
      name: 'tree',
      sequenceEndNumber: 3255,
      sequenceStartNumber: 3130,
    },
    movieProps: {
      direction: 'similarity',
    },
  },
]

const puddle: IMovieSpec[] = [
  {
    frameSrc: {
      ext: 'jpeg',
      name: 'puddle-left',
      sequenceEndNumber: 5390,
      sequenceStartNumber: 5345,
    },
    movieProps: {
      frameRate: 7,
    }
  }, {
    frameSrc: {
      ext: 'jpeg',
      name: 'puddle-center',
      sequenceEndNumber: 5344,
      sequenceStartNumber: 5282,
    },
    movieProps: {
      frameRate: 16,
    },
  }, {
    frameSrc: {
      ext: 'jpeg',
      name: 'puddle-right',
      sequenceEndNumber: 5447,
      sequenceStartNumber: 5391,
    },
    movieProps: {
      direction: 'reverse',
      frameRate: 30,
    },
  },
]

const puddleOverlay: IMovieSpec[] = [
  {
    frameSrc: {
      ext: 'jpeg',
      name: 'puddle-left',
      sequenceEndNumber: 5390,
      sequenceStartNumber: 5345,
    },
    movieProps: {
      frameRate: 10,
    },
  }, {
    frameSrc: {
      ext: 'jpeg',
      name: 'puddle-center',
      sequenceEndNumber: 5344,
      sequenceStartNumber: 5282,
    },
    movieProps: {
      flickerThreshold: 0.9,
      frameRate: 16,
    },
  },
]

function hallDirectionFunction(frameNumber: number) {
  if (frameNumber === 50) {
    const dir = Math.random() > 0.9 ? 'reverse' : 'forward'
    return dir
  }
  return 'forward'
}

const hall: IMovieSpec[] = [
  {
    frameSrc: {
      ext: 'jpg',
      name: 'hall-base',
      sequenceEndNumber: 1194,
      sequenceStartNumber: 1064,
    },
    movieProps: {
      direction: hallDirectionFunction(1),
    },
  }, {
    frameSrc: {
      ext: 'jpg',
      name: 'hall-figure',
      sequenceEndNumber: 1325,
      sequenceStartNumber: 1229,
    },
    movieProps: {
      direction: hallDirectionFunction(2),
      flickerThreshold: 0.5,
      frameRate: 13,
    },
  },
]

const field: IMovieSpec[] = [
  {
    frameSrc: {
      ext: 'jpg',
      name: 'field-base',
      sequenceEndNumber: 1954,
      sequenceStartNumber: 1870,
    },
  }, {
    frameSrc: {
      ext: 'jpg',
      name: 'field-overlay',
      sequenceEndNumber: 1869,
      sequenceStartNumber: 1789,
    },
    movieProps: {
      flickerThreshold: 0.5,
      frameRate: 15,
    },
  },
]

const cta: IMovieSpec[] = [
  {
    frameSrc: {
      ext: 'jpeg',
      name: 'cta',
      sequenceEndNumber: 3469,
      sequenceStartNumber: 3306,
    },
  }, {
    frameSrc: {
      ext: 'jpeg',
      name: 'cta',
      sequenceEndNumber: 3469,
      sequenceStartNumber: 3306,
    },
    movieProps: {
      frameRate: 20,
      flickerThreshold: 0.5,
    },
  },
]

function theaterRoute(name: string, specs: IMovieSpec[], match: any) {
  return (match.params.name === name ?
      <Theater
        movieSpecs={specs}
        name={name}
      />
      :
      <></>
  )
}

function DemoMovies({ match }: IProps): ReactElement {
  return (
    <div className="page page--demo-movies">
      <nav>
        <Link to="/demo-movies/hall">hall</Link>&nbsp;
        <Link to="/demo-movies/tree">tree</Link>&nbsp;
        <Link to="/demo-movies/puddle-overlay">puddle-overlay</Link>&nbsp;
        <Link to="/demo-movies/cta">cta</Link>&nbsp;
        <Link to="/demo-movies/field">field</Link>
      </nav>
      {theaterRoute('hall', hall, match)}
      {theaterRoute('tree', tree, match)}
      {theaterRoute('puddle', puddle, match)}
      {theaterRoute('puddle-overlay', puddleOverlay, match)}
      {theaterRoute('cta', cta, match)}
      {theaterRoute('field', field, match)}
    </div>
  )
}

export default DemoMovies
