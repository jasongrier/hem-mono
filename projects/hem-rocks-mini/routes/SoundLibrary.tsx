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

          HEM-SL works currently in all versions of Ableton Live (including the free, limited versions that ship with MIDI controllers), without any add-ons or upgrades. We aim to support the least powerful CPU's available on the used market as possible. Versions of HEM-SL for GarageBand and Javascript are currently under construction.

          <em>HEM-SL is on a pay-what-you-can basis, with a suggested price of 25 Euro per pack. (Paying <strong>zero</strong> is also fine!)</em>

          <em>To keep up with new releases, join the mailing list by clicking <a href="" target="_blank">here</a></em>.
        `)}
        buttonText="Download"
        filters={[
          'Instruments',
          'Generative Tools',
          'Sonic Detritus',
          'Performativity/Activism',
          'Field Recording',
          'Extended Technique',
          'New',
          'Coming Soon',
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
