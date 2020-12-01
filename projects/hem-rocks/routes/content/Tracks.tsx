import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { MainContentList, contentItemToTrack, hasCategory, hasTag } from '../../modules/content'
import { TrackPlayPauseButton } from '../../../../lib/modules/website-player'
import { BASE_SITE_TITLE } from '../../config'

function Tracks(): ReactElement {
  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks">
        <MainContentList
          currentFilter={currentFilter}
          excludeFromAll="Sound Library"
          category="tracks"
          linkTo={ item => hasTag(item, 'attachment') ? item.relatedContentLink : `tracks/${item.slug}` }
        >
          {item => {
            const track = contentItemToTrack(item)

            return (
              <>
                <TrackPlayPauseButton track={track} />
                { hasTag(item, 'attachment') && (
                  <Link
                    className="action-button"
                    to={item.relatedContentLink}
                  >
                    Learn more
                  </Link>
                )}
              </>
            )
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default Tracks
