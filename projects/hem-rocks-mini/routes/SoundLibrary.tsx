import React, { ReactElement } from 'react'
import autop from 'lines-to-paragraphs'
import { MainContentList } from '../components'
import { TrackPlayPauseButton } from '../../../lib/modules/player'

function SoundLibrary(): ReactElement {
  return (
    <div className="page page-sound-library">
      <MainContentList
        blurb={autop(`
          HEM Sound Library is a collection of sounds and instruments that are not likely to be found anywhere else: A crumbling 200 year-old piano, eerie sounds discarded by compression algorithms, a grand piano with rice paper laid across the strings, NYC post-election protests as recorded off a web browser with a choppy internet connection in Berlin. As an issues-based sample library, HEM-SL goes beyond simply being a producer's toolkit, and more toward raising discourse in areas of sonic detritus, acoustic ecology, psychoacoustics, labor theory, and performativity. HEM-SL also includes some complex generative MIDI tools to aid in ––or to supplant entirely–– the process of music creation.
        `)}
        buttonText="Download"
        campaignMonitorId="5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756"
        filters={[
          'Instruments',
          'Generative Tools',
          'Sonic Detritus',
          'Performativity/Activism',
          'Field Recording',
          'Extended Technique',
          'New in the Library',
          'Coming Soon',
        ]}
        highlights={[
          'Works in <em>all</em> versions of Ableton Live (even Live Lite)',
          'Pay-what-you-can pricing, from zero to whatever',
          // 'Desktop, Javascript and GarageBand formats in development'
        ]}
        infoPopupTitle="About the Sound Library"
        tag="sound-library"
        title="Sound Library"
      >
        {(pack) => (
          <TrackPlayPauseButton track={{
            id: pack.slug,
            type: 'soundcloud',
            resource: pack.soundCloudTrackId,
          }}/>
        )}
      </MainContentList>
    </div>
  )
}

export default SoundLibrary