import React, { ReactElement } from 'react'
import { WaveformHalf } from './waveform-half'
import './style.css'

interface IProps {
  waveformData: number[]
}

function WaveformView({ waveformData }: IProps): ReactElement {
  return (
    <div className="waveform">
      <div className="bars">
        <div className="top-bars">
          <WaveformHalf waveformData={waveformData} />
        </div>
        <div className="bottom-bars">
          <WaveformHalf waveformData={waveformData} />
        </div>
      </div>
      <div className="markers"></div>
      <div className="waveform-status-bar"></div>
    </div>
  )
}

export default WaveformView
