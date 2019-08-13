import React, { ReactElement } from 'react'

interface IProps {
  id: string
  label: string
  cta: string
  onFormSubmitted?: (evt: React.SyntheticEvent<HTMLFormElement>) => void
}

function CampaignMonitorForm({
  id,
  label,
  cta,
  onFormSubmitted,
 }: IProps): ReactElement {
  return (
    <div className="campaign-monitor-form">
      <form
        id="subForm"
        className="js-cm-form email-signup"
        action="https://www.createsend.com/t/subscribeerror?description="
        method="post"
        data-id={id}
        onSubmit={onFormSubmitted}
      >
        {label && <label>Join us?</label>}

        <input id="fieldName" name="cm-name" type="text" placeholder="Name" />

        <input
          id="fieldEmail"
          name="cm-ojyuyjy-ojyuyjy"
          type="email"
          className="js-cm-email-input"
          required
          placeholder="Email address"
        />

        <button type="submit">{cta}</button>
      </form>

      <script
        type="text/javascript"
        src="https://js.createsend1.com/javascript/copypastesubscribeformlogic.js"
      />
    </div>
  )
}

export default CampaignMonitorForm
