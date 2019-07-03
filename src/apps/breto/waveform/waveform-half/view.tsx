import React, { ReactElement, Fragment } from 'react'

interface IProps {
  waveformData: number[]
}

function WaveformHalf({ waveformData }: IProps): ReactElement {
  return (
    <Fragment>
      {waveformData.map((amplitude: number, i: number) =>
        <div
          key={i}
          className="bar"
          style={{height: ((amplitude + 1) * 50) + '%'}}
        />
      )}
    </Fragment>
  )
}

export default WaveformHalf
