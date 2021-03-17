import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { findIndex } from 'lodash'
import { TrackPlayPauseButton, replacePlaylist, setPlayerPlaylist, ITrack } from '../../../../lib/modules/website-player'
import { hasCategory, contentItemToTrack, getContentItemById, getContentItemsFromList, IContentItem} from '../../modules/core/content'

declare const window: any

interface IProps {
  item: IContentItem
  contentItems: IContentItem[]
  currentProject: string | null
}

function PlayableBoxActions({ item, contentItems, currentProject }: IProps): ReactElement {
  const dispatch = useDispatch()

  if (!currentProject) return <div />

  let attachedTracks: ITrack[] = []

  if (hasCategory(item, 'tracks')) {
    attachedTracks = [contentItemToTrack(item)]
  }

  else {
    const attachmentIds = item.attachments.split('\n')

    for (const id of attachmentIds) {
      const attachment = getContentItemById(contentItems, id)

      if (!attachment) continue

      if (hasCategory(attachment, 'playlists')) {
        const playlistTracks = getContentItemsFromList(contentItems, attachment.slug, currentProject).map(track =>
          contentItemToTrack(track)
        )
        attachedTracks = attachedTracks.concat(playlistTracks)
      }

      else if (hasCategory(attachment, 'tracks')) {
        attachedTracks.push(contentItemToTrack(attachment))
      }
    }
  }

  if (!attachedTracks || !attachedTracks.length) return <div />

  return (
    <TrackPlayPauseButton
      activeFor={attachedTracks}
      track={attachedTracks[0]}
      onClick={() => {
        const pagePlaylistIndex = findIndex(window.STORE.getState().player.playlists, { name: 'On this page' })
        const selectedPlaylistIndex = findIndex(window.STORE.getState().player.playlists, { name: 'Selected playlist' })

        if (!hasCategory(item, 'tracks') && selectedPlaylistIndex > -1) {
          dispatch(replacePlaylist(selectedPlaylistIndex, { name: 'Selected playlist', tracks: attachedTracks, displayName: item.title }))
          dispatch(setPlayerPlaylist(selectedPlaylistIndex))
        }

        else if (hasCategory(item, 'tracks') && pagePlaylistIndex > -1) {
          dispatch(setPlayerPlaylist(pagePlaylistIndex))
        }
      }}
    />
  )
}

export default PlayableBoxActions
