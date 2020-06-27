import React, { ReactElement, SyntheticEvent, useCallback, useState } from 'react'
import Spinner from './Spinner'
import uuid from 'uuid/v1'

interface IProps {
  action: string
  buttonText: string
  emailLabel: string
  emailPlaceholder: string
  errorContent: () => ReactElement
  spinnerText: string
  subjectLabel: string
  successContent: (id: string) => ReactElement
  textareaLabel: string
  textareaPlaceholder: string

  subjects?: string[]
  subjectPlaceholder?: string
  title?: string
}

function ContactForm({
  action,
  buttonText,
  emailLabel,
  emailPlaceholder,
  errorContent,
  spinnerText,
  subjectLabel,
  subjects,
  successContent,
  textareaLabel,
  textareaPlaceholder,

  subjectPlaceholder,
  title,
 }: IProps): ReactElement {
  const [body, setBody] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [id, setId] = useState<string>()
  const [subject, setSubject] = useState<string>(subjects ? subjects[0] : '')
  const [uiState, setUiState] = useState<number>(0)

  const onSubjectChange = useCallback(
    function onSubjectChangeFn(evt: SyntheticEvent<HTMLSelectElement | HTMLInputElement>) {
      setSubject(evt.currentTarget.value)
    }, [],
  )

  const onEmailChange = useCallback(
    function onEmailChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      setEmail(evt.currentTarget.value)
    }, [],
  )

  const onBodyChange = useCallback(
    function onBodyChangeChangeFn(evt: SyntheticEvent<HTMLTextAreaElement>) {
      setBody(evt.currentTarget.value)
    }, [],
  )

  const onSubmit = useCallback(
    function onSubmitFn(evt: SyntheticEvent<HTMLFormElement>) {
      evt.preventDefault()

      const messageId = uuid()

      setId(messageId)
      setUiState(1)

      setTimeout(function fakeDelayForRealism() {
        fetch(action, {
          body: JSON.stringify({ body, email, messageId, subject }),
          method: 'post',
        })
          .then((res) => {
            if (res.statusText === 'OK') {
              setUiState(2)
            }

            else {
              setUiState(3)
            }
          })
          .catch(() => {
            setUiState(3)
          })
      }, 500)
    }, [body, email, subject],
  )

  return (
    <div className="hem-contact-form">
      { uiState === 0 && (
        <div className="hem-contact-form-default">
          { title && (
            <h1>{ title }</h1>
          )}
          <form
            autoComplete="off"
            className="hem-contact-form"
            onSubmit={onSubmit}
          >
            <div className="form-row">
              <label htmlFor="subject">{ subjectLabel }</label>
              { subjects && subjects.length > 0 && (
                <select
                  name="subject"
                  onChange={onSubjectChange}
                >
                  { subjects.map(subject => (
                    <option
                      key={subject}
                      value={subject}
                    >
                      { subject }
                    </option>
                  ))}
                </select>
              )}
              { (!subjects || subjects.length < 1) && (
                <input
                  name="subject"
                  onChange={onSubjectChange}
                  placeholder={subjectPlaceholder}
                  type="text"
                />
              )}
            </div>
            <div className="form-row">
              <label htmlFor="email">{ emailLabel }</label>
              <input
                name="email"
                onChange={onEmailChange}
                placeholder={emailPlaceholder}
                type="text"
              />
            </div>
            <div className="form-row">
              <label htmlFor="body">{ textareaLabel }</label>
              <textarea
                name="body"
                onChange={onBodyChange}
                placeholder={textareaPlaceholder}
              ></textarea>
            </div>
            <div className="form-row">
              <button type="submit">{ buttonText }</button>
            </div>
          </form>
        </div>
      )}
      { uiState === 1 && (
        <div className="hem-contact-form-loading">
          <h1>{ spinnerText }</h1>
          <Spinner />
        </div>
      )}
      { uiState === 2 && (
        <div className="hem-contact-form-success">
          { successContent(id) }
        </div>
      )}
      { uiState === 3 && (
        <div className="hem-contact-form-error">
          { errorContent() }
        </div>
      )}
    </div>
  )
}

export default ContactForm
