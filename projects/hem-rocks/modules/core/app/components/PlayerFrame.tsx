import React, { useEffect, PropsWithChildren, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { slugify } from 'voca'
import { PlayerBar, setPlayerPlaylistExpanded, setPlayerPlaylist, replacePlaylist, setPlayerExpanded, setPlayerMessage, setPlayerInstance } from '../../../../../../lib/modules/website-player'
import { Toaster } from '../../../../../../lib/components'
import { requestReadChunk, IContentItem, contentItemToTrack, getContentItemsFromList } from '../../content'
import { RootState } from '../../../../index'
import { PROJECT_CONFIGS } from '../../../../config'

interface IProps {}

function PlayerFrame({}: PropsWithChildren<IProps>): ReactElement {
  const {
    chunkLog,
    contentItems,
    currentProject,
    playerError,
    playerMessage
  } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    contentItems: state.content.contentItems,
    currentProject: state.content.currentProject,
    playerError: state.player.error,
    playerMessage: state.player.message,
  }))

  const dispatch = useDispatch()

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
    if (!chunkLog.includes('curated-playlists')) return

    PROJECT_CONFIGS[currentProject].CURATED_PLAYLISTS.forEach(({ linkTo, name, slug }, i) => {
      const trackContentItems: IContentItem[] = getContentItemsFromList(contentItems, slug || slugify(name))
      const tracks = trackContentItems.map(item =>
        contentItemToTrack(item)
      )

      dispatch(replacePlaylist(i, { name: name.replace('Player ', ''), tracks, linkTo }))
    })

    dispatch(setPlayerPlaylist(0))
  }, [contentItems, chunkLog])

  useEffect(function collapsePlayerOnRouteChange() {
    dispatch(setPlayerPlaylistExpanded(false))
    dispatch(setPlayerExpanded(false))
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
