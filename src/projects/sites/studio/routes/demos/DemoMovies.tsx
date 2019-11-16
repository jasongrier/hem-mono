import React, { ReactElement } from 'react'
import Theater , { IMovieSpec } from '../../components/Theater' // TODO: Barrel file (all projects)

const tree: IMovieSpec[] = [
  {
    frameSrc: {
      ext: 'jpeg',
      name: 'tree',
      sequenceEndNumber: 3255,
      sequenceStartNumber: 3130,
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

function hallDirectionFunction(which) {
  return function (frameNumber) {
    if (frameNumber === 50) {
      const dir = Math.random() > 0.9 ? 'reverse' : 'forward'
      return dir
    }
    return 'forward'
  }
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

function DemoMovies(): ReactElement {
  return (
    <div className="page page--demo-movies">
      <Theater
        movieSpecs={hall} // TODO: Rename prop "frameSets" to "movieSpec"
        name="hall"
      />
      {/* <Theater
        movieSpecs={tree}
        name="tree"
      />
      <Theater
        movieSpecs={puddle}
        name="puddle"
      />
      <Theater
        movieSpecs={puddleOverlay}
        name="puddle-overlay"
      />
      <Theater
        movieSpecs={cta}
        name="cta"
      />
      <Theater
        movieSpecs={field}
        name="field"
      /> */}
    </div>
  )
}

export default DemoMovies
