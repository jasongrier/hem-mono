import React, { ReactElement } from 'react'
import autop from 'lines-to-paragraphs'
import { MainContentList } from '../components'
import { TrackPlayPauseButton } from '../../../lib/modules/player'

function Label(): ReactElement {
  return (
    <div className="page page-label">
      <MainContentList
        blurb={autop(`
          From 2006 to 2013, HEM operated primarily as a record label and events promoter, and was fortunate to count artists such as Ariel Pink, Julia Holter, Michael Pisaro, William Basinski, Lucrecia Dalt, Ekkehard Ehlers, Linda Perhacs, among many others.
        `)}
        buttonText="Download"
        campaignMonitorId="5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756"
        filters={[
          'Record Releases',
          'Events',
          'Mixes',
          'Tracks',
          'Rarities',
        ]}
        infoPopupTitle="About the Sound Library"
        tag="label"
        title="Label"
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

export default Label
