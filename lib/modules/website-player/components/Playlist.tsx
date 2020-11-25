import React, { useRef, ReactElement, SyntheticEvent, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import { findIndex, filter, last } from 'lodash'
import { Spinner } from '../../../components'
import { PlayPauseButton as BasePlayPauseButton, CloseButton } from '../../../packages/hem-buttons'
import { ITrack, IPlaylist, setPlayerPlaylist } from '../index'
import TrackPlayPauseButton from './TrackPlayPauseButton'
import Scrollbars from 'react-scrollbars-custom'
import { pausePlayer, replacePlaylist, unpausePlayer } from '../actions'

interface IProps {
  onCollapse: () => void
}

function Playlist({ onCollapse }: IProps): ReactElement {
  const { actuallyPlaying, currentPlaylist, currentTrack, playing, playlists, playlistExpanded }:
        { actuallyPlaying: boolean, currentPlaylist: IPlaylist, currentTrack: ITrack, playing: boolean, playlists: IPlaylist[], playlistExpanded: boolean } = useSelector((state: any) => ({
    actuallyPlaying: state.player.actuallyPlaying,
    currentPlaylist: state.player.currentPlaylist,
    currentTrack: state.player.currentTrack,
    playing: state.player.playing,
    playlists: state.player.playlists,
    playlistExpanded: state.player.playlistExpanded,
  }))

  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState<string>('')
  const [page, setPage] = useState<ITrack[]>([])

  useEffect(function captureSpaceBar() {
    // if (!playlistExpanded) return

    // function onBodyKeyDown(evt: any) {
    //   if (evt.keyCode === 32) {
    //     evt.preventDefault()

    //     if (playing && actuallyPlaying) {
    //       dispatch(pausePlayer())
    //     }

    //     else {
    //       dispatch(unpausePlayer())
    //     }
    //   }
    // }

    // document.body.addEventListener('keydown', onBodyKeyDown)

    // return function cleanup() {
    //   document.body.removeEventListener('keydown', onBodyKeyDown)
    // }
  }, [playlistExpanded, playing, actuallyPlaying])

  useEffect(function pagination() {
    const tracks = Array.from(currentPlaylist.tracks)
    setPage(tracks.slice(0, 25))
  }, [currentPlaylist.id])

  const searchOnChange = useCallback(
    function searchOnChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      evt.stopPropagation()
      const searchText = evt.currentTarget.value

      setSearchText(searchText)

      if (searchText.length) {
        const allTracksPlaylistIndex = findIndex(playlists, { name: 'Search Results' })
        dispatch(setPlayerPlaylist(allTracksPlaylistIndex))
      }

      else {
        dispatch(setPlayerPlaylist(0))
      }
    }, [],
  )

  function playlistOnScroll(scrollValues: any) {
    // const reachedEnd = !!!(scrollValues.scrollHeight - scrollValues.scrollTop - scrollValues.clientHeight)

    // if (reachedEnd) {
    //   setPage(page.concat(page))
    // }
  }

  return (
    <div className="hem-player-playlist">
      <div className="hem-player-playlist-tabs">
        { filter(playlists, ({name}) => {
          if (name === 'Empty') return false
          if (name === 'Search Results' && !searchText.length) return false
          return true
        }).map(tabPlaylist => (
          <div
            className={`
              hem-player-playlist-tab
              ${ tabPlaylist.id === currentPlaylist.id ? 'hem-player-playlist-active-tab' : ''}
            `}
            key={tabPlaylist.name}
            onClick={() => {
              if (tabPlaylist.id === currentPlaylist.id) return

              const nextPlaylistNumber = findIndex(playlists, { id: tabPlaylist.id })
              const emptyPlaylistNumber = findIndex(playlists, { name: 'Empty' })

              if (nextPlaylistNumber === -1) return

              dispatch(setPlayerPlaylist(emptyPlaylistNumber))

              setTimeout(() => {
                dispatch(setPlayerPlaylist(nextPlaylistNumber))
              }, 100)
            }}
          >
            { tabPlaylist.name }
          </div>
        ))}
        {/* <div className="hem-player-playlist-search">
          <input
            onChange={searchOnChange}
            placeholder="Artist, title, tag, etc..."
            type="text"
            value={searchText}
          />
          <i className="fa-icon fas fa-search"></i>
        </div> */}
        <div className="hem-player-playlist-search">

        </div>
      </div>
      { !currentPlaylist.component && (
        <div className="hem-player-playlist-list-head">
          <div className="hem-player-playlist-line-text">
            <div className="hem-player-playlist-line-title">
              Title
            </div>
            <div className="hem-player-playlist-line-secondary-attribution">
              Artist
            </div>
            <div className="hem-player-playlist-line-date">
              Date
            </div>
            <div className="hem-player-playlist-line-time">
              <i className="far fa-clock" />
            </div>
          </div>
        </div>
      )}
      <div className="hem-player-playlist-window-controls">
        <div className="playlist-toggle-close">
          <CloseButton onClick={onCollapse} />
        </div>
      </div>

      { currentPlaylist.component && (
        currentPlaylist.component(currentPlaylist) // TODO: Player pages are separate concept from playlists
      )}

      <div className="empty-tab-spinner">
        <Spinner />
      </div>

      { !currentPlaylist.component && page.length > 0 && (
        <ul>
          <Scrollbars
            noScrollX={true}
            onScroll={playlistOnScroll}
          >
            { page.map((track: ITrack, trackNumber: number) => (
              <li
                key={track.id}
                className={`
                  clearfix
                  ${(playing && currentTrack && track.id === currentTrack.id) ? 'hem-player-playlist-line-active' : ''}
                  ${(trackNumber === currentPlaylist.tracks.length - 1) ? 'hem-player-playlist-line-last' : ''}
                `}
              >
                <div className="track-number">{ trackNumber + 1 }</div>
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
                    <img src={track.keyArt} alt={`${track.title} — ${track.attribution}`} />
                    <p>
                      <strong>{ track.title }</strong>
                    </p>
                  </div>
                  <span onClick={() => {
                    ReactGA.event({
                      category: 'User',
                      action: 'Clicked on track attribution in playlist: ' + track.title + ', ' + track.attribution + '.',
                    })
                  }}>
                    <div className="hem-player-playlist-line-attribution">
                      <Link to={ track.attributionLink }>
                        { track.attribution }
                      </Link>
                    </div>
                  </span>
                  <div className="hem-player-playlist-line-date">
                    { track.date }
                  </div>
                  <div className="hem-player-playlist-line-time">
                    { track.duration }
                  </div>
                </div>
              </li>
            ))}
            {/* <li className="load-waterfall">
              <Spinner />
            </li> */}
          </Scrollbars>
        </ul>
      )}
      { currentPlaylist && !currentPlaylist.component && currentPlaylist.tracks.length < 1 && (
        <div className="hem-player-playlist-tab-empty">
          {/* Hmpf! None on this page */}
        </div>
      )}
    </div>
  )
}

export default Playlist
