import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList, contentItemToTrack } from '../../modules/content'
import { TrackPlayPauseButton } from '../../../../lib/modules/player'
import { BASE_SITE_TITLE } from '../../config'

function Tracks(): ReactElement {
  const { filter: currentFilter } = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks">
        <MainContentList
          currentFilter={currentFilter}
          filters={[
            'Album Tracks',
            'Exclusives',
            'Live',
            'Made with SL',
            'Rarities',
            'Sound Library',
          ]}
          excludeFromAll="Sound Library"
          category="tracks"
          title="Tracks"
        >
          {(item) => {
            const track = contentItemToTrack(item, '')
            return (
              <TrackPlayPauseButton track={track} />
            )
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default Tracks
