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
          // blurb={() => (
          //   <>
          //     <p>HEM Sound Library is a unique collection of sounds chosen for their social, political, and extramusical resonances. <Link to="/about-sl">more...</Link></p>
          //     <p><Link to="/made-with-sl">Made something with SL?</Link></p>
          //   </>
          // )}
          category="sound-library"
          currentFilter={currentFilter}
          excludeFromAll="Midi Devices"
          filters={[
            'ASMR',
            'Extended Technique',
            'Field Recording',
            'Found Sound',
            'Generative Tools',
            'Guitar and Bass',
            'Instruments',
            'Keys',
            'Labor Theory',
            'Microtonality',
            'Midi Devices',
            'New in the Library',
            'Percussion',
            'Performativity / Activism',
            'Post Studio',
            'Sonic Detritus',
            'Strings',
            'Synth',
            'Secondhand Store Vinyl',
            'Toy Instruments',
            'Vocal',
            'Winds',
          ]}
        >
          {(pack) => {
            const attachedTracks = getContentItemsFromRawList(allContentItems, pack.trackSlugs).map(track =>
              contentItemToTrack(track)
            )

            if (!attachedTracks || !attachedTracks.length) return <div />

            return <TrackPlayPauseButton track={attachedTracks[0]} />
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default SoundLibrary
