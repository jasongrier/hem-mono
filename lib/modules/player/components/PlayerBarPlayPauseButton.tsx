import React, { ReactElement } from 'react'
import { noop } from 'lodash'
import { PlayPauseButton as BasePlayPauseButton } from '../../../packages/hem-buttons'
import { PlayPauseButton as PlayerPlayPauseButton, TrackPlayPauseButton, ITrack } from '../index'

interface IProps {
  currentTrackId: string | null
  playlist: ITrack[]
}

function whichPlayButton(currentTrackId: string | null, playlist: ITrack[]) {
  if (currentTrackId) {
    return (
      <PlayerPlayPauseButton />
    )
  }

  else if (playlist[0]) {
    return (
      <TrackPlayPauseButton track={playlist[0]} />
    )
  }

  else {
    return (
      <BasePlayPauseButton
        playing={false}
        onClick={noop}
      />
    )
  }
}

function PlayerBarPlayPauseButton({ currentTrackId, playlist }: IProps): ReactElement {
  return whichPlayButton(currentTrackId, playlist)
}

export default PlayerBarPlayPauseButton
