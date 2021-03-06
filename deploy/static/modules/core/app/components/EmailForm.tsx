import React, { ReactElement } from 'react'
import { CampaignMonitorForm } from '../../../../../../lib/components'
import { CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, BERLIN_STOCK_PHOTOS, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME } from '../../../../config'

interface IProps {
  onFormSubmitted?: () => void
}

function EmailForm({ onFormSubmitted }: IProps): ReactElement {
  // TODO: Delete this component or use it consistently everywhere
  return (
    <div className="email-form">
      <h2>While you're here, take a sec and sign up to our mailing list</h2>
      { BERLIN_STOCK_PHOTOS && (
        <p>You'll receive weekly updates about new photos, prints, and more.</p>
      )}
      { !BERLIN_STOCK_PHOTOS && (
        <p>You'll receive updates about new packs, releases, merch, and more.</p>
      )}
      <CampaignMonitorForm
        action={CAMPAIGN_MONITOR_FORM_ACTION}
        emailFieldName={CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME}
        id={CAMPAIGN_MONITOR_FORM_ID}
        onFormSubmitted={onFormSubmitted}
        submitButtonText="Sign me up!"
      />
    </div>
  )
}

export default EmailForm
