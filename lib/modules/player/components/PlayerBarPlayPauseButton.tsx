import React, { ReactElement } from 'react'
import { noop } from 'lodash'
import { PlayPauseButton as BasePlayPauseButton } from '../../../packages/hem-buttons'
import { PlayPauseButton as PlayerPlayPauseButton, TrackPlayPauseButton, ITrack, IPlaylist } from '../index'

interface IProps {
  currentTrackId: string | null
  playing: boolean
  playlist: IPlaylist

  trigger?: boolean
}

function whichPlayButton(currentTrackId: string | null, playing: boolean, playlist: IPlaylist, trigger?: boolean) {
  if ((trigger || playing) && currentTrackId) {
    return (
      <PlayerPlayPauseButton />
    )
  }

  else if (trigger && playlist && playlist.tracks[0]) {
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

function PlayerBarPlayPauseButton({ currentTrackId, playing, playlist, trigger }: IProps): ReactElement {
  return whichPlayButton(currentTrackId, playing, playlist, trigger)
}

export default PlayerBarPlayPauseButton
