import React, { ReactElement } from 'react'
import Theater , { IMovieSpec } from '../components/Theater' // TODO: Barrel file (all projects)

const tree: IMovieSpec[] = [
  {
    ext: 'jpeg',
    name: 'tree',
    sequenceEndNumber: 3255,
    sequenceStartNumber: 3130,
  }
]

const puddle: IMovieSpec[] = [
  {
    ext: 'jpeg',
    name: 'puddle-left',
    frameRate: 7,
    sequenceEndNumber: 5390,
    sequenceStartNumber: 5345,
  }, {
    ext: 'jpeg',
    name: 'puddle-center',
    frameRate: 16,
    sequenceEndNumber: 5344,
    sequenceStartNumber: 5282,
  }, {
    ext: 'jpeg',
    name: 'puddle-right',
    frameRate: 30,
    sequenceEndNumber: 5447,
    sequenceStartNumber: 5391,
  }
]

const puddleOverlay: IMovieSpec[] = [
  {
    ext: 'jpeg',
    name: 'puddle-left',
    frameRate: 10,
    sequenceEndNumber: 5390,
    sequenceStartNumber: 5345,
  }, {
    ext: 'jpeg',
    flickerThreshold: 0.9,
    frameRate: 16,
    name: 'puddle-center',
    sequenceEndNumber: 5344,
    sequenceStartNumber: 5282,
  }
]

const hall: IMovieSpec[] = [
  {
    ext: 'jpg',
    name: 'hall-base',
    sequenceEndNumber: 1194,
    sequenceStartNumber: 1064,
  }, {
    ext: 'jpg',
    flickerThreshold: 0.5,
    frameRate: 13,
    name: 'hall-figure',
    sequenceEndNumber: 1325,
    sequenceStartNumber: 1229,
  }
]

const field: IMovieSpec[] = [
  {
    ext: 'jpg',
    name: 'field-base',
    sequenceEndNumber: 1954,
    sequenceStartNumber: 1870,
  }, {
    ext: 'jpg',
    flickerThreshold: 0.5,
    frameRate: 15,
    name: 'field-overlay',
    sequenceEndNumber: 1869,
    sequenceStartNumber: 1789,
  }
]

const cta: IMovieSpec[] = [
  {
    ext: 'jpeg',
    name: 'cta',
    sequenceEndNumber: 3469,
    sequenceStartNumber: 3306,
  }, {
    ext: 'jpeg',
    name: 'cta',
    flickerThreshold: 0.5,
    frameRate: 20,
    sequenceEndNumber: 3469,
    sequenceStartNumber: 3306,
  }
]

function DemoMovies(): ReactElement {
  return (
    <div className="page page--demo-movies">
      <Theater
        frameSets={hall} // TODO: Rename prop "frameSets" to "movieSpec"
        name="hall"
      />
      <Theater
        frameSets={tree}
        name="tree"
      />
      <Theater
        frameSets={puddle}
        name="puddle"
      />
      {/* <Theater
        frameSets={puddleOverlay}
        name="puddle-overlay"
      /> */}
      <Theater
        frameSets={cta}
        name="cta"
      />
      <Theater
        frameSets={field}
        name="field"
      />
    </div>
  )
}

export default DemoMovies
