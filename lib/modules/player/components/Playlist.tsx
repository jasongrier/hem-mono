import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITrack } from '../index'

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
            { track.title }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Playlist
