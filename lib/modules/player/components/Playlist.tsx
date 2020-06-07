import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findIndex } from 'lodash'
import { ITrack, IPlaylist, setPlayerPlaylist } from '../index'
import TrackPlayPauseButton from './TrackPlayPauseButton'
import Scrollbars from 'react-scrollbars-custom'

function Playlist(): ReactElement {
  const { currentPlaylist, currentTrack, playing, playlists }: { currentPlaylist: IPlaylist, currentTrack: ITrack, playing: boolean, playlists: IPlaylist[] } = useSelector((state: any) => ({
    currentPlaylist: state.player.currentPlaylist,
    currentTrack: state.player.currentTrack,
    playing: state.player.playing,
    playlists: state.player.playlists,
  }))

  const dispatch = useDispatch()

  return (
    <div className="hem-player-playlist">
      { playlists.length > 1 && (
        <div className="hem-player-playlist-tabs">
          { playlists.map(tabPlaylist => (
            <div
              className={`
                hem-player-playlist-tab
                ${ tabPlaylist.id === currentPlaylist.id ? 'hem-player-playlist-active-tab' : ''}
              `}
              key={tabPlaylist.name}
              onClick={() => {
                if (tabPlaylist.id === currentPlaylist.id) return

                const nextPlaylistNumber = findIndex(playlists, { id: tabPlaylist.id })

                if (nextPlaylistNumber === -1) return

                dispatch(setPlayerPlaylist(nextPlaylistNumber))
              }}
            >
              { tabPlaylist.name }
            </div>
          ))}
        </div>
      )}
      { currentPlaylist && currentPlaylist.tracks.length && (
        <ul>
          <Scrollbars noScrollX={true}>
            { currentPlaylist.tracks.map((track: ITrack) => (
              <li key={track.id}>
                <TrackPlayPauseButton track={track} />
                { track.title }
              </li>
            ))}
          </Scrollbars>
        </ul>
      )}
      { currentPlaylist && !currentPlaylist.tracks.length && (
        <div className="hem-player-playlist-tab-empty">
          Hmpf! None on this page
        </div>
      )}
    </div>
  )
}

export default Playlist
