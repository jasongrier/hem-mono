import React, { ReactElement, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HeadphonesButton } from '../../../../../lib/packages/hem-buttons'
import { PlayPauseButton, TrackPlayPauseButton, setPlayerPlaylist } from '../../../../../lib/modules/player'
import { getTracksFromContentItems } from '../../content'
import { RootState } from '../../../index'

function PlayerBar(): ReactElement {
  const { allContentItems, currentTrackId, playing, playlist } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    currentTrackId: state.player.currentTrackId,
    playing: state.player.playing,
    playlist: state.player.playlist,
  }))

  const dispatch = useDispatch()

  const [expanded, setExpanded] = useState(false)

  useEffect(function loadPlayer() {
    const tracks = getTracksFromContentItems(allContentItems)

    const fooContentItems = [
      allContentItems.find(item => item.slug === 'acoustic-guitar'),
      allContentItems.find(item => item.slug === 'antique-piano'),
    ]

    const fooTracks = getTracksFromContentItems(fooContentItems)

    dispatch(setPlayerPlaylist(fooTracks))
  }, [])

  return (
    <div className={`
      player-bar
      ${ playing ? 'player-bar-playing' : '' }
      ${ expanded ? 'player-bar-expanded' : '' }
    `}>
      { currentTrackId && (
        <PlayPauseButton />
      )}
      { playlist.length && !currentTrackId && (
        <TrackPlayPauseButton track={playlist[0]} />
      )}
      <HeadphonesButton
        onClick={() => setExpanded(!expanded)}
      />
    </div>
  )
}

export default PlayerBar
