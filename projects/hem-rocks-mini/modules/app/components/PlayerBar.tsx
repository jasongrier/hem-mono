import React, { ReactElement, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HeadphonesButton } from '../../../../../lib/packages/hem-buttons'
import { NextButton, PlayPauseButton, TrackPlayPauseButton, setPlayerPlaylist } from '../../../../../lib/modules/player'
import { getTracksFromContentItems } from '../../content'
import { RootState } from '../../../index'

function PlayerBar(): ReactElement {
  const { allContentItems, currentTrackAttribution, currentTrackId, playing, playlist } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    currentTrackAttribution: state.player.currentTrackAttribution,
    currentTrackId: state.player.currentTrackId,
    playing: state.player.playing,
    playlist: state.player.playlist,
  }))

  const dispatch = useDispatch()

  const [expanded, setExpanded] = useState(false)

  useEffect(function loadPlayer() {
    const tracks = getTracksFromContentItems(allContentItems)
    dispatch(setPlayerPlaylist(tracks))
  }, [])

  const currentTrackContentItem = allContentItems.find(contentItem => contentItem.slug === currentTrackId)

  return (
    <div className={`
      player-bar
      ${ playing ? 'player-bar-playing' : '' }
      ${ expanded ? 'player-bar-expanded' : '' }
    `}>
      { currentTrackId && (
        <>
          <PlayPauseButton />
          <NextButton />
        </>
      )}
      { playlist.length && !currentTrackId && (
        <TrackPlayPauseButton track={playlist[0]} />
      )}
      <HeadphonesButton
        onClick={() => setExpanded(!expanded)}
      />
      { currentTrackContentItem && (
        <div className="player-bar-now-playing">
          Now playing: { currentTrackAttribution }: { currentTrackContentItem.name }
        </div>
      )}
    </div>
  )
}

export default PlayerBar
