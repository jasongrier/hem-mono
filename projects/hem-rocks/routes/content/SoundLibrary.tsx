import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MainContentList, contentItemToTrack, getContentItemsFromRawList } from '../../modules/content'
import { TrackPlayPauseButton } from '../../../../lib/modules/website-player'
import { BASE_SITE_TITLE } from '../../config'
import { SoundLibrarySubnav } from '../../components/layout'
import { RootState } from '../../index'

function SoundLibrary(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-sound-library page-with-subnav page-with-banner">
        <SoundLibrarySubnav />
        <MainContentList
          buttonText="Download"
          category="sound-library"
          currentFilter={currentFilter || 'all'}
          excludeFromAll="Midi Devices"
          orderByOrder={true}
          noAll={false}
          shouldSetCurrentPlaylist={true}
          speciallyOrderedTags={['Featured']}
          excludeTags={['Home Features']}
        >
          {(pack) => {
            const attachedTracks = getContentItemsFromRawList(allContentItems, pack.attachments).map(track =>
              contentItemToTrack(track)
            )

            if (!attachedTracks || !attachedTracks.length) return <div />

            return (
              <TrackPlayPauseButton
                activeFor={attachedTracks}
                track={attachedTracks[0]}
              />
            )
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default SoundLibrary
