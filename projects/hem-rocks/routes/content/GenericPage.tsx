import React, { ReactElement } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { map } from 'lodash'
import marked from 'marked'
import { CampaignMonitorForm } from '../../../../lib/components'
import { SoundLibrarySubnav } from '../../components/layout'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE, CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, BERLIN_STOCK_PHOTOS } from '../../config'
import { RootState } from '../../index'
import { getContentItemBySlug, hasCategory, IContentItem } from '../../modules/content'
import { autoParagraph } from '../../../../lib/functions'

function AboutSoundLibrary(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems.filter(item =>
      hasCategory(item, 'site-texts')
      && item.published
    ),
  }))

  const { contentItemSlug }: any = useParams()

  let contentItem: IContentItem | false = false

  if (contentItemSlug) {
    contentItem = getContentItemBySlug(contentItems, contentItemSlug)
  }

  if (contentItem === false) return <div />

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className={'page page-' + (contentItem === undefined ? 'content-item-not-found' : contentItem?.slug)}>
        { contentItem && (
          <h1>{ contentItem?.title }</h1>
        )}
        { !contentItem && (
          <h1>Uh oh&hellip;</h1>
        )}
        <SoundLibrarySubnav />
        <div className="main-content-section first-main-content-section">
          { contentItem && (
            <div dangerouslySetInnerHTML={{
              __html: marked(contentItem.description),
            }} />
          )}
          { !contentItem && (
            <p>We couldn't find what you're looking for.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default AboutSoundLibrary
