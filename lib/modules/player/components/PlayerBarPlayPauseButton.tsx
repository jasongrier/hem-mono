import React, { ReactElement } from 'react'
import { noop } from 'lodash'
import { PlayPauseButton as BasePlayPauseButton } from '../../../packages/hem-buttons'
import { PlayPauseButton as PlayerPlayPauseButton, TrackPlayPauseButton, ITrack, IPlaylist } from '../index'

interface IProps {
  currentTrackId: string | null
  playlist: IPlaylist
}

function whichPlayButton(currentTrackId: string | null, playlist: IPlaylist) {
  if (currentTrackId) {
    return (
      <PlayerPlayPauseButton />
    )
  }

  else if (playlist && playlist.tracks[0]) {
    return (
      <TrackPlayPauseButton track={playlist.tracks[0]} />
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
