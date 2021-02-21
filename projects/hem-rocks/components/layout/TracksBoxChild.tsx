import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { TrackPlayPauseButton } from '../../../../lib/modules/website-player'
import { IContentItem, hasCategory, contentItemToTrack, getContentItemsFromRawList, hasTag } from '../../modules/core/content'

interface IProps {
  item: IContentItem
  allContentItems: IContentItem[]
}

function TracksBoxChild({ item, allContentItems }: IProps): ReactElement {
  if (hasCategory(item, 'tracks')) {
    const track = contentItemToTrack(item)

    return (
      <>
        <TrackPlayPauseButton track={track} />
        { hasTag(item, 'attachment') && (
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
    const attachedTracks = getContentItemsFromRawList(allContentItems, item.attachments).map(track =>
      contentItemToTrack(track)
    )

    if (!attachedTracks || !attachedTracks.length) return <div />

    return (
      <TrackPlayPauseButton
        activeFor={attachedTracks}
        track={attachedTracks[0]}
      />
    )
  }
}

export default TracksBoxChild
