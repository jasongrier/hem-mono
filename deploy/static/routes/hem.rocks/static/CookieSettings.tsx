import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { CookieSettings } from '../../../modules/core/app'
import { BASE_SITE_TITLE } from '../../../config'

function CookieSettingsPage(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-cookie-settings">
        <h1>Cookie Settings</h1>
        <CookieSettings />
      </div>
    </>
  )
}

export default CookieSettingsPage
