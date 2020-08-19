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

  const { filter: currentFilter } = useParams()

  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-sound-library page-with-subnav">
        <h1>Sound Library</h1>
        <SoundLibrarySubnav />
        <MainContentList
          buttonText="Download"
          category="sound-library"
          currentFilter={currentFilter}
          excludeFromAll="Midi Devices"
          orderByOrder={true}
        >
          {(pack) => {
            const attachedTracks = getContentItemsFromRawList(allContentItems, pack.trackSlugs).map(track =>
              contentItemToTrack(track)
            )

            if (!attachedTracks || !attachedTracks.length) return <div />

            return <TrackPlayPauseButton 
              track={attachedTracks[0]} 
              activeFor={attachedTracks} 
            />
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default SoundLibrary
