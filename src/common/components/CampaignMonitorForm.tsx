import React, { ReactElement } from 'react'

interface IProps {
  id: string
  labelForName?: string
  labelForEmail?: string
  submitButtonText?: string
  onFormSubmitted?: (evt: React.SyntheticEvent<HTMLFormElement>) => void
}

function CampaignMonitorForm({
  id,
  labelForName,
  labelForEmail,
  submitButtonText = 'Sumbit',
  onFormSubmitted,
 }: IProps): ReactElement {
  return (
    <div className="campaign-monitor-form">
      <form
        id="subForm"
        className="js-cm-form"
        action="https://www.createsend.com/t/subscribeerror?description="
        method="post"
        data-id={id}
        onSubmit={onFormSubmitted}
      >
        {labelForName && <label>{labelForName}</label>}

        <input id="fieldName" name="cm-name" type="text" placeholder="Name" />

        {labelForEmail && <label>{labelForEmail}</label>}

        <input
          id="fieldEmail"
          name="cm-ojyuyjy-ojyuyjy"
          type="email"
          className="js-cm-email-input"
          required
          placeholder="Email address"
        />

        <button type="submit">{submitButtonText}</button>
      </form>

      <script
        type="text/javascript"
        src="https://js.createsend1.com/javascript/copypastesubscribeformlogic.js"
      />
    </div>
  )
}

export default CampaignMonitorForm
