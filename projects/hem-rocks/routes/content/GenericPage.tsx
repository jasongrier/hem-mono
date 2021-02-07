import React, { ReactElement, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Mustache from 'mustache'
import ReactGA from 'react-ga'
import { map } from 'lodash'
import marked from 'marked'
import { CampaignMonitorForm } from '../../../../lib/components'
import { SoundLibrarySubnav } from '../../components/layout'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE, CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, BERLIN_STOCK_PHOTOS } from '../../config'
import { RootState } from '../../index'
import { getContentItemBySlug, hasCategory, hasTag, IContentItem } from '../../modules/content'
import { autoParagraph } from '../../../../lib/functions'

function AboutSoundLibrary(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems.filter(item =>
      hasCategory(item, 'site-texts')
      && item.published
    ),
  }))

  const { contentItemSlug }: any = useParams()

  const [contentItem, setContentItem] = useState<IContentItem | null | false>(null)

  useEffect(function load() {
    if (!contentItems.length) return

    const foundContentItem = getContentItemBySlug(contentItems, contentItemSlug)

    if (foundContentItem) {
      setContentItem(foundContentItem)
    }

    else {
      setContentItem(false)
    }
  }, [contentItems])

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className={'page page-' + (contentItem === false ? 'content-item-not-found' : contentItem?.slug)}>
        {(
          contentItemSlug === 'about-sl'
          || contentItemSlug === 'whats-new-in-sl2'
          || contentItemSlug === 'made-with-sl'
        ) && (
          <SoundLibrarySubnav />
        )}
        { contentItem && !hasTag(contentItem, 'hide-title') && (
          <h1>{ contentItem?.title }</h1>
        )}
        { contentItem === false && (
          <h1>Uh oh&hellip;</h1>
        )}
        <div className="main-content-section first-main-content-section">
          { contentItem && (
            <div dangerouslySetInnerHTML={{
              __html: marked(
                Mustache.render(contentItem.description, { assetHost: assetHostHostname() })
              ),
            }} />
          )}
          { contentItem === false && (
            <p>We couldn't find what you're looking for.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default AboutSoundLibrary
