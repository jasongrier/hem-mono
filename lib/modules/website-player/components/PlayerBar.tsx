import React, { ReactElement, useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import { PlayPauseButton as BasePlayPauseButton, CloseButton, HamburgerButton } from '../../../packages/hem-buttons'
import {
  NextButton,
  PreviousButton,
  ProgressBar,
  PlayerBarPlayPauseButton,
  Playlist,
  ITrack,
  IPlaylist,
  setPlayerAlreadyOpened,
  setPlayerActuallyPlaying,
  setPlayerExpanded,
  setPlayerPlaylistExpanded,
} from '../index'

function PlayerBar(): ReactElement {
  const { currentTrack, playing, currentPlaylist, expanded, playlistExpanded, alreadyOpened } = useSelector((state: any) => ({
    currentTrack: state.player.currentTrack,
    playing: state.player.playing,
    currentPlaylist: state.player.currentPlaylist,
    expanded: state.player.expanded,
    playlistExpanded: state.player.playlistExpanded,
    alreadyOpened: state.player.alreadyOpened,
  }))

  const dispatch = useDispatch()

  useEffect(function openOnPlay() {
    if (playing && !expanded) {
      dispatch(setPlayerExpanded(true))
      dispatch(setPlayerPlaylistExpanded(false))
    }
  }, [playing])

  const togglePlaylistExpandedOnClick = useCallback(
    function togglePlaylistExpandedOnClickFn() {
      ReactGA.event({
        category: 'User',
        action: 'Toggled the playlist: ' + !playlistExpanded + '.',
      })
      dispatch(setPlayerPlaylistExpanded(!playlistExpanded))
    }, [playlistExpanded],
  )

  if (!currentPlaylist) return <div />

  return (
    <div className={`
      player-bar
      ${ playing ? 'player-bar-playing' : '' }
      ${ expanded ? 'player-bar-expanded' : '' }
      ${ playlistExpanded ? 'player-bar-playlist-expanded' : '' }
    `}>
      <PreviousButton />

      <div className="player-bar-main-play-button">
        <PlayerBarPlayPauseButton
          currentTrackId={currentTrack?.id}
          playing={playing}
          playlist={currentPlaylist}
          trigger={true}
        />
      </div>

      <NextButton />

      <div className="player-bar-progress-bar">
        <span className="player-bar-progress-bar-time player-bar-progress-bar-time-start">0:00</span>
        <ProgressBar id="player-bar-progress-bar" />
        <span className="player-bar-progress-bar-time player-bar-progress-bar-time-end">5:43</span>
      </div>

      <div className="playlist-toggle">
        { !playlistExpanded && (
          <HamburgerButton onClick={togglePlaylistExpandedOnClick} />
        )}
        { playlistExpanded && (
          <div className="playlist-toggle-close">
            <BasePlayPauseButton
              playing={false}
              onClick={togglePlaylistExpandedOnClick}
            />
          </div>
        )}
      </div>

      { playlistExpanded && (
        <div className="player-bar-playlist">
          <Playlist onCollapse={() => dispatch(setPlayerPlaylistExpanded(false))} />
        </div>
      )}

      <div className="player-bar-toggle">
        { expanded && (
          <CloseButton onClick={() => {
            ReactGA.event({
              category: 'User',
              action: 'Closed the player bar.',
            })
            dispatch(setPlayerExpanded(false))
          }} />
        )}
        { !expanded && (
          <div onClick={() => {
            if (playing) return
            dispatch(setPlayerAlreadyOpened(true))
            dispatch(setPlayerExpanded(true))
            dispatch(setPlayerPlaylistExpanded(true))
            ReactGA.event({
              category: 'User',
              action: 'Opened the player bar.',
            })
          }}>
            <PlayerBarPlayPauseButton
              currentTrackId={currentTrack?.id}
              playing={playing}
              playlist={currentPlaylist}
              trigger={!alreadyOpened}
            />
          </div>
        )}
      </div>
      <div className="player-bar-now-playing">
        <img src="http://placekitten.com/68/68" alt=""/>
        <p>
          <strong>{ currentTrack?.title }</strong><br/>
          { currentTrack?.attribution }
        </p>
      </div>
    </div>
  )
}

export default PlayerBar
