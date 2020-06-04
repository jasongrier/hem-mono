import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList, contentItemToTrack } from '../../modules/content'
import { TrackPlayPauseButton } from '../../../../lib/modules/player'
import { BASE_SITE_TITLE } from '../../config'

function Mixes(): ReactElement {
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
          category="mixes"
          title="Mixes"
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

export default Mixes
