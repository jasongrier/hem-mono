import React, { ReactElement, useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import ReactGA from 'react-ga'
import { noop } from 'lodash'
import { PlayPauseButton as BasePlayPauseButton, CloseButton, HamburgerButton, PlayPauseButton as DumbPlayPauseButton } from '../../../packages/hem-buttons'
import { NextButton, PreviousButton, ProgressBar, PlayerBarPlayPauseButton, Playlist, ITrack, IPlaylist } from '../index'

function PlayerBar(): ReactElement {
  const { currentTrack, playing, currentPlaylist }: { currentTrack: ITrack, playing: boolean, currentPlaylist: IPlaylist } = useSelector((state: any) => ({
    currentTrack: state.player.currentTrack,
    playing: state.player.playing,
    currentPlaylist: state.player.currentPlaylist,
  }))

  const [expanded, setExpanded] = useState(false)
  const [playlistExpanded, setPlaylistExpanded] = useState(false)
  const [playlistAutoOpened, setPlaylistAutoOpened] = useState(false)

  const { pathname } = useLocation()

  useEffect(() => {
    setExpanded(false)
    setPlaylistExpanded(false)
  }, [pathname])

  // useEffect(function TEMP() {
  //   setTimeout(function() {
  //     setExpanded(true)
  //     setPlaylistExpanded(true)
  //   }, 250)
  // }, [])

  useEffect(function openOnPlay() {
    if (playing && !expanded) {
      setExpanded(true)
    }
  }, [playing])

  const togglePlaylistExpandedOnClick = useCallback(
    function togglePlaylistExpandedOnClickFn() {
      ReactGA.event({
        category: 'User',
        action: 'Toggled the playlist: ' + !playlistExpanded + '.',
      })
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

      <div className="player-bar-main-play-button">
        <PlayerBarPlayPauseButton
          currentTrackId={currentTrack?.id}
          playing={playing}
          playlist={currentPlaylist}
          trigger={true}
        />
      </div>

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
          <Playlist onCollapse={() => setPlaylistExpanded(false)} />
        </div>
      )}

      <div className="player-bar-toggle">
        { expanded && (
          <CloseButton onClick={() => {
            ReactGA.event({
              category: 'User',
              action: 'Closed the player bar.',
            })
            setExpanded(false)
            setPlaylistExpanded(false)
          }} />
        )}
        { !expanded && (
          <div onClick={() => {
            setExpanded(true)

            if (!playlistAutoOpened) {
              setPlaylistExpanded(true)
              setPlaylistAutoOpened(true)
            }

            ReactGA.event({
              category: 'User',
              action: 'Opened the player bar.',
            })
          }}>
            { playing && (
              <DumbPlayPauseButton
                onClick={noop}
                playing={true}
              />
            )}
            { !playing && (
              <PlayerBarPlayPauseButton
                currentTrackId={currentTrack?.id}
                playing={playing}
                playlist={currentPlaylist}
              />
            )}
          </div>
        )}
      </div>
      <div className="player-bar-now-playing">
        { currentTrack && (
          <span>
            <span onClick={() => {
              ReactGA.event({
                category: 'User',
                action: 'Clicked on "now playing" title: ' + currentTrack.title + '.',
              })
            }}>
              <Link to={currentTrack.titleLink}>
                { currentTrack.title }
              </Link>
            </span>

            &nbsp;–&nbsp;

            <span onClick={() => {
              ReactGA.event({
                category: 'User',
                action: 'Clicked on "now playing" attribution: ' + currentTrack.title + ', ' + currentTrack.attribution + '.',
              })
            }}>
              <Link to={currentTrack.attributionLink}>
                { currentTrack.attribution }
              </Link>
            </span>
          </span>
        )}
      </div>
    </div>
  )
}

export default PlayerBar
