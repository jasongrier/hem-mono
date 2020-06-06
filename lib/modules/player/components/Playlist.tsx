import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITrack } from '../index'
import TrackPlayPauseButton from './TrackPlayPauseButton'

function Playlist(): ReactElement {
  const { currentTrack, playing, playlist } = useSelector((state: any) => ({
    currentTrack: state.player.currentTrack,
    playing: state.player.playing,
    playlist: state.player.playlist,
  }))

  const dispatch = useDispatch()

  return (
    <div className="hem-player-playlist">
      <ul>
        { playlist.map((track: ITrack) => (
          <li
            key={track.id}
          >
            <TrackPlayPauseButton track={track} />
            { track.title }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Playlist
