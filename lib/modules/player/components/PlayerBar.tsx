import React, { ReactElement, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { PlayPauseButton as BasePlayPauseButton, CloseButton, HamburgerButton } from '../../../packages/hem-buttons'
import { NextButton, PreviousButton, ProgressBar, PlayerBarPlayPauseButton, Playlist, ITrack } from '../index'

function PlayerBar(): ReactElement {
  const { currentTrack, playing, playlist }: { currentTrack: ITrack, playing: boolean, playlist: ITrack[] } = useSelector((state: any) => ({
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
        currentTrackId={currentTrack?.id}
        playlist={playlist}
      />

      <NextButton />

      <ProgressBar id="player-bar-progress-bar" />

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
          <Playlist />
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
      {currentTrack && (
        <div className="player-bar-now-playing">
          <span onClick={() => setExpanded(false)}>
            <Link to={currentTrack.titleLink}>
              { currentTrack.title }
            </Link>
            &nbsp;–&nbsp;
            <Link to={currentTrack.attributionLink}>
              { currentTrack.attribution }
            </Link>
          </span>
        </div>
      )}
    </div>
  )
}

export default PlayerBar
