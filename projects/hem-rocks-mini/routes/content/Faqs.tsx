import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList, contentItemToTrack } from '../../modules/content'
import { TrackPlayPauseButton } from '../../../../lib/modules/player'
import { BASE_SITE_TITLE } from '../../config'

function Faqs(): ReactElement {
  const { filter: currentFilter } = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-faqs">
        <MainContentList
          currentFilter={currentFilter}
          filters={[
            'Sound Library',
            'General',
            'Shop',
            'HEM Organisation',
            'Label',
          ]}
          category="faqs"
          title="FAQ's"
        />
      </div>
    </>
  )
}

export default Faqs
