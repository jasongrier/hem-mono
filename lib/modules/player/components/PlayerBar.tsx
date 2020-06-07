import React, { ReactElement, useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PlayPauseButton as BasePlayPauseButton, CloseButton, HamburgerButton } from '../../../packages/hem-buttons'
import { NextButton, PreviousButton, ProgressBar, PlayerBarPlayPauseButton, Playlist, ITrack, IPlaylist } from '../index'

function PlayerBar(): ReactElement {
  const { currentTrack, playing, currentPlaylist }: { currentTrack: ITrack, playing: boolean, currentPlaylist: IPlaylist } = useSelector((state: any) => ({
    currentTrack: state.player.currentTrack,
    playing: state.player.playing,
    currentPlaylist: state.player.currentPlaylist,
  }))

  const [expanded, setExpanded] = useState(false)
  const [playlistExpanded, setPlaylistExpanded] = useState(true)

  useEffect(function openOnPlay() {
    if (playing && !expanded) {
      setExpanded(true)
    }
  }, [playing])

  const toggleExpandedOnClick = useCallback(
    function toggleExpandedOnClickFn() {
      if (expanded) {
        setPlaylistExpanded(false)
      }
      setExpanded(!expanded)
    }, [expanded],
  )

  const togglePlaylistExpandedOnClick = useCallback(
    function togglePlaylistExpandedOnClickFn() {
      setPlaylistExpanded(!playlistExpanded)
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

      <PlayerBarPlayPauseButton
        currentTrackId={currentTrack?.id}
        playlist={currentPlaylist}
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
          <PlayerBarPlayPauseButton
            currentTrackId={currentTrack?.id}
            playlist={currentPlaylist}
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
