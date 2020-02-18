import React, { ReactElement } from 'react'

interface IProps {
  id: string

  hasNameField?: boolean
  labelForEmail?: string
  labelForName?: string
  onFormSubmitted?: (evt: React.SyntheticEvent<HTMLFormElement>) => void
  placeholderText?: string
  submitButtonText?: string
}

function MailingListFormMirror({
  id,

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
        className="js-cm-form"
        action="https://www.createsend.com/t/subscribeerror?description="
        method="post"
        data-id={id}
        onSubmit={onFormSubmitted}
      >
        {hasNameField && labelForName &&
          <label>{labelForName}</label>
        }

        {hasNameField &&
          <input id="fieldName" name="cm-name" type="text" placeholder="Name" />
        }

        {labelForEmail &&
          <label>{labelForEmail}</label>
        }

        <input
          name="cm-ojyuyjy-ojyuyjy"
          type="email"
          className="js-cm-email-input"
          required
          placeholder={placeholderText}
        />

        <button type="submit">{submitButtonText}</button>
      </form>
    </div>
  )
}

export default MailingListFormMirror