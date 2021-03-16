import React, { useEffect, PropsWithChildren, ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { slugify } from 'voca'
import { findIndex } from 'lodash'
import { PlayerBar, setPlayerPlaylistExpanded, setPlayerPlaylist, replacePlaylist, addPlaylist, setPlayerExpanded, setPlayerMessage, setPlayerInstance, IPlaylist } from '../../../../../../lib/modules/website-player'
import { Toaster } from '../../../../../../lib/components'
import { requestReadChunk, IContentItem, contentItemToTrack, getContentItemsFromList } from '../../content'
import { RootState } from '../../../../index'
import { PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../../config'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

interface IProps {}

function PlayerFrame({}: PropsWithChildren<IProps>): ReactElement {
  const {
    chunkLog,
    contentItems,
    currentProject,
    playerError,
    playerMessage,
    playlists,
  } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    contentItems: state.content.contentItems,
    currentProject: state.content.currentProject,
    playerError: state.player.error,
    playlists: state.player.playlists,
    playerMessage: state.player.message,
  }))

  const dispatch = useDispatch()

  const [playlistsLoaded, setPlaylistsLoaded] = useState<boolean>(false)

  const { pathname } = useLocation()

  useEffect(function initPlayer() {
    dispatch(setPlayerInstance())
  }, [])

  useEffect(function getCuratedPlaylists() {
    if (chunkLog.length < 1) return
    if (chunkLog.includes('curated-playlists')) return
    dispatch(requestReadChunk('curated-playlists'))
  }, [chunkLog])

  useEffect(function getAllRemainingTracks() {
    if (chunkLog.length < 1) return
    if (chunkLog.includes('tracks')) return
    if (!chunkLog.includes('curated-playlists')) return
    dispatch(requestReadChunk('tracks'))
  }, [chunkLog])

  useEffect(function setSitePlaylists() {
    if (!contentItems) return
    if (!contentItems.length) return
    if (!currentProject) return
    if (!chunkLog.includes('tracks')) return
    if (!chunkLog.includes('curated-playlists')) return
    if (playlistsLoaded) return

    let testTrack

    PROJECT_CONFIGS[currentProject].CURATED_PLAYLISTS.forEach(({ linkTo, name, slug }: any, i: number) => {
      const trackContentItems: IContentItem[] = getContentItemsFromList(contentItems, slug || slugify(name), currentProject)
      const tracks = trackContentItems.map(item =>
        contentItemToTrack(item)
      )

      dispatch(addPlaylist({ name: name.replace('Player ', ''), tracks, linkTo }))

      testTrack = tracks[0]
    })

    dispatch(addPlaylist({ name: 'On this page', tracks: [], linkTo: '#' }))
    dispatch(addPlaylist({ name: 'Current playlist', tracks: [], linkTo: '#' }))
    dispatch(setPlayerPlaylist(0))
    setPlaylistsLoaded(true)
  }, [contentItems, chunkLog, currentProject, playlistsLoaded])

  useEffect(function cleanupOnRouteChange() {
    const pagePlaylistIndex = findIndex(playlists, { name: 'On this page' })

    dispatch(setPlayerPlaylistExpanded(false))
    dispatch(setPlayerExpanded(false))
    dispatch(replacePlaylist(5, { name: 'On this page', tracks: [] }))
    dispatch(setPlayerPlaylist(0))
  }, [pathname])

  return (
    <div className="player-frame">
      <PlayerBar />

      <div
        className="player-bar-overlay"
        onClick={() => {
          dispatch(setPlayerExpanded(false))
          dispatch(setPlayerPlaylistExpanded(false))
        }}
      />

      { playerError && (
        <Toaster message={ playerError } />
      )}

      { playerMessage && (
        <Toaster
          className="player-message"
          message={ playerMessage }
          delay={false}
          delayAfterClick={1000}
          onClose={() => dispatch(setPlayerMessage(null))}
        />
      )}
    </div>
  )
}

export default PlayerFrame
