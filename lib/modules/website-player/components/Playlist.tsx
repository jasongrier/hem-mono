import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import { findIndex, isEmpty } from 'lodash'
import moment from 'moment'
import { PlayPauseButton as BasePlayPauseButton, CloseButton } from '../../../packages/hem-buttons'
import { ITrack, IPlaylist, setPlayerPlaylist, setPlayerError } from '../index'
import TrackPlayPauseButton from './TrackPlayPauseButton'
import Scrollbars from 'react-scrollbars-custom'
import { setPlayerMessage } from '../../soundcloud-player'

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
            { tabPlaylist.displayName || tabPlaylist.name }
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
        <>
          <ul className="hem-player-playlist-table-header">
            <li>
              <div className="hem-player-playlist-line-text">
                <div className="hem-player-playlist-line-title">Title</div>
                <div className="hem-player-playlist-line-attribution">By</div>
                <div className="hem-player-playlist-line-secondary-attribution">From</div>
                <div className="hem-player-playlist-line-duration">Time</div>
                <div className="hem-player-playlist-line-date">Year</div>
                <div className="hem-player-playlist-line-share">Share</div>
              </div>
            </li>
          </ul>
          <ul>
            <Scrollbars noScrollX={true}>
              { currentPlaylist.tracks.map((track: ITrack, i: number) => (
                <li
                  key={track.uid + '-' + i}
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
                    { !isEmpty(track.attribution) && (
                      <span
                        className="hem-player-playlist-line-attribution"
                        onClick={() => {
                          ReactGA.event({
                            category: 'User',
                            action: 'Clicked on track attribution in playlist: ' + track.title + ', ' + track.attribution + '.',
                          })
                      }}>
                        <Link to={ track.attributionLink }>
                          { track.attribution }
                        </Link>
                      </span>
                    )}
                    { isEmpty(track.attribution) && (
                      <span className="hem-player-playlist-line-no-info">&mdash;</span>
                    )}
                    { !isEmpty(track.secondaryAttribution) && (
                      <span
                        className="hem-player-playlist-line-secondary-attribution"
                        onClick={() => {
                          ReactGA.event({
                            category: 'User',
                            action: 'Clicked on track secondary attribution in playlist: ' + track.title + ', ' + track.secondaryAttribution + '.',
                          })
                      }}>
                        <Link to={ track.secondaryAttributionLink }>
                          { track.secondaryAttribution }
                        </Link>
                      </span>
                    )}
                    { isEmpty(track.secondaryAttribution) && (
                      <span className="hem-player-playlist-line-no-info">&mdash;</span>
                    )}
                    <div className="hem-player-playlist-line-duration">
                      { track.duration }
                    </div>
                    <div className="hem-player-playlist-line-date">
                      { moment(track.date, 'MMMM YYYY').format('YYYY') }
                    </div>
                    <div className="hem-player-playlist-line-share">
                      <div
                        className="hem-player-playlist-line-share-clickable-area"
                        onClick={() => {
                          let link

                          // TODO: Hardcoded HEM-specific stuff here!

                          if (currentPlaylist.name === 'Sound Library') {
                            link = 'http://hem.rocks/sound-library/' + track.slug
                          }

                          else {
                            link = 'http://hem.rocks/tracks/' + track.slug
                          }

                          dispatch(setPlayerMessage(`
                            <input type="text" value=${link} id="clipboard-content">
                            <button onclick="copyToClipboard()" id="clipboard-message">Click here to copy link to clipboard</button>
                          `))
                        }}
                      >
                        <div className="hem-player-playlist-line-share-trigger" />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              { currentPlaylist.linkTo && (
                <li onClick={onCollapse}>
                  <div className="hem-player-playlist-line-text hem-player-playlist-line-text-more">
                    <Link to={currentPlaylist.linkTo}>
                      {/* HACK: Remove HEM specific code */}
                      { currentPlaylist.name === 'Releases' && (
                        <span>See all Releases</span>
                      )}
                      { currentPlaylist.name !== 'Releases' && (
                        <span>See all {currentPlaylist.name} Tracks</span>
                      )}
                    </Link>
                  </div>
                </li>
              )}
            </Scrollbars>
          </ul>
        </>
      )}
      { currentPlaylist && currentPlaylist.tracks.length === 0 && (
        <div className="hem-player-playlist-tab-empty">No tracks here!</div>
      )}
    </div>
  )
}

export default Playlist
