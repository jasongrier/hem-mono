import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList, contentItemToTrack } from '../../modules/content'
import { TrackPlayPauseButton } from '../../../../lib/modules/player'
import { BASE_SITE_TITLE } from '../../config'

function Tutorials(): ReactElement {
  const { filter: currentFilter } = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tutorials">
        <MainContentList
          currentFilter={currentFilter}
          filters={[
            'Apps',
            'Code',
            'MIDI Devices',
            'Sound Library',
          ]}
          category="tutorials"
          title="Tutorials"
        />
      </div>
    </>
  )
}

export default Tutorials