import React, { ReactElement, useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlayPauseButton as BasePlayPauseButton, CloseButton, HamburgerButton } from '../../../packages/hem-buttons'
import { NextButton, PreviousButton, ProgressBar, PlayerBarPlayPauseButton } from '../index'

function PlayerBar(): ReactElement {
  const { currentTrack, playing, playlist } = useSelector((state: any) => ({
    currentTrack: state.player.currentTrack,
    playing: state.player.playing,
    playlist: state.player.playlist,
  }))

  const [expanded, setExpanded] = useState(true)
  const [playlistExpanded, setPlaylistExpanded] = useState(true)

  const toggleExpandedOnClick = useCallback(
    function toggleExpandedOnClickFn() {
      setExpanded(!expanded)
    }, [expanded],
  )

  const togglePlaylistExpandedOnClick = useCallback(
    function togglePlaylistExpandedOnClickFn() {
      setPlaylistExpanded(!playlistExpanded)
    }, [playlistExpanded],
  )

  return (
    <div className={`
      player-bar
      ${ playing ? 'player-bar-playing' : '' }
      ${ expanded ? 'player-bar-expanded' : '' }
      ${ playlistExpanded ? 'player-bar-playlist-expanded' : '' }
    `}>
      <PreviousButton />

      <PlayerBarPlayPauseButton
        currentTrackId={currentTrack.id}
        playlist={playlist}
      />

      <NextButton />

      <ProgressBar id="player-bar-progress-bar" />

      <div className="playlist-toggle">
        { !playlistExpanded && (
          <HamburgerButton onClick={togglePlaylistExpandedOnClick} />
        )}
        { playlistExpanded && (
          <BasePlayPauseButton
            playing={false}
            onClick={togglePlaylistExpandedOnClick}
          />
        )}
      </div>

      { playlistExpanded && (
        <div className="player-bar-playlist">
        </div>
      )}

      <div className="player-bar-toggle">
        { expanded && (
          <CloseButton onClick={toggleExpandedOnClick} />
        )}
        { !expanded && (
          <BasePlayPauseButton
            playing={playing}
            onClick={toggleExpandedOnClick}
          />
        )}
      </div>
      <div className="player-bar-now-playing">
        { currentTrack.attribution }
      </div>
    </div>
  )
}

export default PlayerBar
