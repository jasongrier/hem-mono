import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
// @ts-ignore
import autop from 'lines-to-paragraphs'
import { MainContentList } from '../modules/content'
import { TrackPlayPauseButton } from '../../../lib/modules/player'
import { BASE_SITE_TITLE } from '../config'

function SoundLibrary(): ReactElement {

  const { filter: currentFilter } = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-sound-library">
        <MainContentList
          blurb={autop(`HEM Sound Library is a collection of sounds and instruments that are not likely to be found anywhere else: A crumbling 200 year-old piano, eerie sounds discarded by noise reduction algorithms, a grand piano with rice paper laid across the strings, NYC post-election protests as recorded off a web browser with a choppy internet connection in Berlin.

          As an issues-based sample library, HEM-SL reaches beyond its role as a production tool to engage in discourses on sonic detritus, acoustic ecology, psychoacoustics, labor theory, and performativity. HEM-SL also includes some complex generative MIDI tools to aid in ––or to supplant entirely–– the process of music creation.`)}
          buttonText="Download"
          campaignMonitorId="5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756"
          currentFilter={currentFilter}
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
          exclusiveFilters={[
            'Coming Soon',
            'Midi Devices',
          ]}
          highlights={[
            'Works in <em>all</em> versions of Ableton Live (even Live Lite)',
            'Pay-what-you-can pricing, from zero to whatever',
            'GarageBand, Standalone, and Kontakt formats coming soon'
          ]}
          infoPopupTitle="About the Sound Library"
          tag="sound-library"
          title="Sound Library"
        >
          {(pack) => (
            pack.trackId ?
              <TrackPlayPauseButton
                track={{
                  attribution: pack.attribution,
                  id: pack.slug,
                  resource: pack.trackId,
                  type: 'soundcloud',
                }}
              />
              :
              <div />
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default SoundLibrary
