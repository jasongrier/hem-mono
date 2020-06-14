import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import { findIndex } from 'lodash'
import { PlayPauseButton as BasePlayPauseButton, CloseButton } from '../../../packages/hem-buttons'
import { ITrack, IPlaylist, setPlayerPlaylist } from '../index'
import TrackPlayPauseButton from './TrackPlayPauseButton'
import Scrollbars from 'react-scrollbars-custom'

interface IProps {
  onCollapse: () => void
}

function Playlist({ onCollapse }: IProps): ReactElement {
  const { currentPlaylist, currentTrack, playing, playlists }: { currentPlaylist: IPlaylist, currentTrack: ITrack, playing: boolean, playlists: IPlaylist[] } = useSelector((state: any) => ({
    currentPlaylist: state.player.currentPlaylist,
    currentTrack: state.player.currentTrack,
    playing: state.player.playing,
    playlists: state.player.playlists,
  }))

  const dispatch = useDispatch()

  return (
    <div className="hem-player-playlist">
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
      <div className="hem-player-playlist-window-controls">
        <div className="playlist-toggle-close">
          <BasePlayPauseButton
            playing={false}
            onClick={onCollapse}
          />
        </div>
      </div>
      { currentPlaylist && currentPlaylist.tracks.length > 0 && (
        <ul>
          <Scrollbars noScrollX={true}>
            { currentPlaylist.tracks.map((track: ITrack) => (
              <li
                key={track.id}
                className={`
                  clearfix
                  ${(playing && currentTrack && track.id === currentTrack.id) ? 'hem-player-playlist-line-active' : ''}
                `}
              >
                <TrackPlayPauseButton
                  onClick={(playing) => {
                    if (playing) return
                    ReactGA.event({
                      category: 'User',
                      action: 'Started track from playlist: ' + track.title + '.',
                    })
                  }}
                  track={track}
                />
                <div className="hem-player-playlist-line-text">
                  <div className="hem-player-playlist-line-title">
                    { track.title }
                  </div>
                  <span onClick={() => {
                    ReactGA.event({
                      category: 'User',
                      action: 'Clicked on track attribution in playlist: ' + track.title + ', ' + track.attribution + '.',
                    })
                  }}>
                    <Link
                      className="hem-player-playlist-line-attribution"
                      to={ track.attributionLink }
                    >
                      { track.attribution }
                    </Link>
                  </span>
                  <span onClick={() => {
                    ReactGA.event({
                      category: 'User',
                      action: 'Clicked on track secondary attribution in playlist: ' + track.title + ', ' + track.secondaryAttribution + '.',
                    })
                  }}>
                    <Link
                      className="hem-player-playlist-line-secondary-attribution"
                      to={ track.secondaryAttributionLink }
                    >
                      { track.secondaryAttribution }
                    </Link>
                  </span>
                </div>
              </li>
            ))}
          </Scrollbars>
        </ul>
      )}
      { currentPlaylist && currentPlaylist.tracks.length < 1 && (
        <div className="hem-player-playlist-tab-empty">
          Hmpf! None on this page
        </div>
      )}
    </div>
  )
}

export default Playlist
