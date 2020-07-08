import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { CampaignMonitorForm } from '../../../../lib/components'
import { AboutSubnav } from '../../components/layout'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE, CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME } from '../../config'

function CookiePolicy(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-about page-with-subnav">
        <h1>Cookie Policy</h1>
        
      </div>
    </>
  )
}

export default CookiePolicy
