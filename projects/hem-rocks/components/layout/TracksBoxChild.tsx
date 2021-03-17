import React, { ReactElement, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findIndex, map } from 'lodash'
import { TrackPlayPauseButton, replacePlaylist, setPlayerPlaylist, IPlaylist, ITrack } from '../../../../lib/modules/website-player'
import { IContentItem, hasCategory, contentItemToTrack, getContentItemsFromRawList, hasTag, hasProperty } from '../../modules/core/content'
import { RootState } from '../../index'

declare const window: any

interface IProps {
  allTracksItems: IContentItem[]
  item: IContentItem
}

function TracksBoxChild({ item, allTracksItems }: IProps): ReactElement {
  const dispatch = useDispatch()

  const playButtonOnClick = useCallback(
    function playButtonOnClickFact(tracks: ITrack[], isTrack: boolean) {
      return function playButtonOnClickFn() {
        const pagePlaylistIndex = findIndex(window.STORE.getState().player.playlists, { name: 'On this page' })
        const selectedPlaylistIndex = findIndex(window.STORE.getState().player.playlists, { name: 'Selected playlist' })

        if (!isTrack && selectedPlaylistIndex > -1) {
          dispatch(replacePlaylist(selectedPlaylistIndex, { name: 'Selected playlist', tracks, displayName: item.title }))
          dispatch(setPlayerPlaylist(selectedPlaylistIndex))
        }

        else if (isTrack && pagePlaylistIndex > -1) {
          dispatch(setPlayerPlaylist(pagePlaylistIndex))
        }
      }
    }, [],
  )

  if (hasCategory(item, 'tracks')) {
    const track = contentItemToTrack(item)

    return (
      <>
        <TrackPlayPauseButton
          track={track}
          onClick={playButtonOnClick([track], true)}
        />
        { hasProperty(item, 'attachment') && (
          <Link
            className="action-button"
            to={item.relatedContentLink}
          >
            Learn more
          </Link>
        )}
      </>
    )
  }

  else if (hasCategory(item, 'playlists')) {
    const tracks = getContentItemsFromRawList(allTracksItems, item.attachments).map(track =>
      contentItemToTrack(track)
    )

    if (!tracks) return <div />
    if (!tracks.length) return <div />

    return (
      <TrackPlayPauseButton
        activeFor={tracks}
        track={tracks[0]}
        onClick={playButtonOnClick(tracks, false)}
      />
    )
  }

  return <div />
}

export default TracksBoxChild
