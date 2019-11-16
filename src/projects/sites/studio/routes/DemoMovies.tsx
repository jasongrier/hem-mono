import React, { ReactElement, useState } from 'react'
import Theater , { IFrameSet } from '../components/Theater' // TODO: Barrel file (all projects)

const frameSets: IFrameSet[] = [
  {
    name: 'tree',
    sequenceEndNumber: 3130,
    sequenceStartNumber: 3255,
  }
]

function DemoMovies(): ReactElement {
  return (
    <div className="page page--demo-movies">
      <Theater frameSets={frameSets} />
    </div>
  )
}

export default DemoMovies
