import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import marked from 'marked'
import { CampaignMonitorForm } from '../../../../lib/components'
import { SoundLibrarySubnav } from '../../components/layout'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE, CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, BERLIN_STOCK_PHOTOS } from '../../config'
import { RootState } from '../../index'
import { getContentItemBySlug } from '../../modules/content'
import { autoParagraph } from '../../../../lib/functions'

function AboutSoundLibrary(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
  }))

  const aboutSLpage = getContentItemBySlug(contentItems, 'about-sl')

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-about-sound-library">
        <h1>About SL</h1>
        <SoundLibrarySubnav />
        <div className="main-content-section first-main-content-section">
          <div dangerouslySetInnerHTML={{
            __html: marked(aboutSLpage.description),
          }} />
        </div>
        <div className="main-content-section">
          <h2>Sign up to stay updated about new sounds and plugins in Library</h2>
          <div className="inline-newsletter-form">
            <CampaignMonitorForm
              action={CAMPAIGN_MONITOR_FORM_ACTION}
              emailFieldName={CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME}
              id={CAMPAIGN_MONITOR_FORM_ID}
              onFormSubmitted={() => {
                ReactGA.event({
                  category: 'User',
                  action: 'Joined the mailing list from the about sound library page.',
                })
              }}
              submitButtonText="Sign me up!"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutSoundLibrary
