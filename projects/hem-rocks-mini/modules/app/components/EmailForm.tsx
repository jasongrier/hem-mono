import React, { ReactElement } from 'react'
import { CampaignMonitorForm } from '../../../../../lib/components'

function EmailForm(): ReactElement {
  return (
    <div className="email-popup">
      <h1>Get updates and new releases by email</h1>
      <CampaignMonitorForm id="foo" />
    </div>
  )
}

export default EmailForm
