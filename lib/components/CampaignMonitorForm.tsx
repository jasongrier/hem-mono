import React, { ReactElement } from 'react'

interface IProps {
  action: string
  id: string
  emailFieldName: string

  hasNameField?: boolean
  labelForEmail?: string
  labelForName?: string | null
  onFormSubmitted?: (evt: React.SyntheticEvent<HTMLFormElement>) => void
  placeholderText?: string
  submitButtonText?: string
}

function CampaignMonitorForm({
  action,
  id,
  emailFieldName,

  hasNameField = true,
  labelForEmail,
  labelForName,
  onFormSubmitted,
  placeholderText = 'Email address',
  submitButtonText = 'Submit',
 }: IProps): ReactElement {
  return (
    <div className="campaign-monitor-form">
      <form
        id={id}
        className="js-cm-form"
        action={action}
        method="post"
        data-id={id}
        onSubmit={onFormSubmitted}
      >
        { hasNameField && labelForName &&
          <label>{ labelForName }</label>
        }

        { hasNameField &&
          <input
            id="fieldName"
            name="cm-name"
            placeholder="Name"
            type="text"
          />
        }

        { labelForEmail &&
          <label>{labelForEmail}</label>
        }

        <input
          id="fieldEmail"
          name={emailFieldName}
          type="email"
          className="js-cm-email-input"
          required
          placeholder={placeholderText}
        />

        <button type="submit">
          { submitButtonText }
        </button>
      </form>
    </div>
  )
}

export default CampaignMonitorForm
