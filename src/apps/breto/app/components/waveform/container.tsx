import { debounce } from 'lodash'
import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from '../../../../../common/spinner'
import { RootState } from '../../../store'
import { redrawWaveform } from './utils'
import { thunkGetChannelData } from './redux'
import WaveformView from './view'

interface IProps {
  width: number // Keep this decoupled
}

function WaveformContainer({ width }: IProps): ReactElement {
  const { channelData, waveformData, waveformBusy } = useSelector((state: RootState) => ({
    channelData: state.waveform.channelData, // Decouple this and pass through props
    waveformData: state.waveform.waveformData,
    waveformBusy: state.waveform.waveformBusy,
  }))

  const dispatch = useDispatch()
  const getChannelDataCb = () => { dispatch(thunkGetChannelData()) }
  const redrawCb = debounce(() => redrawWaveform(channelData, width, waveformBusy), 500)

  useEffect(getChannelDataCb, [])
  useEffect(redrawCb, [waveformBusy, width])

  return (
    <Spinner ready={!waveformBusy}>
      <WaveformView waveformData={waveformData} />
    </Spinner>
  )
}

export default WaveformContainer
