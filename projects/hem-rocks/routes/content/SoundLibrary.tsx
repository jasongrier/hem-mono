import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { find } from 'lodash'
import { MainContentList, contentItemToTrack, getContentItemsFromRawList } from '../../modules/content'
import { TrackPlayPauseButton } from '../../../../lib/modules/player'
import { BASE_SITE_TITLE } from '../../config'
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
      <div className="page page-sound-library">
        <MainContentList
          buttonText="Download"
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
            'Thrift Store Vinyl',
            'Toy Instruments',
            'Vocal',
            'Winds',
          ]}
          title="Sound Library"
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
