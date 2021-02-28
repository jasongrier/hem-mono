import React, { ReactElement, SyntheticEvent, useCallback, useState } from 'react'
import Spinner from './Spinner'
import uuid from 'uuid/v1'

interface IProps {
  action: string
  buttonText: string
  emailPlaceholder: string
  errorContent: () => ReactElement
  spinnerText: string
  successContent: (id?: string) => ReactElement

  bodyAsInput?: boolean
  bodyLabel?: string
  bodyPlaceholder?: string
  emailLabel?: string
  prefilledBody?: string
  prefilledSubject?: string
  subjectLabel?: string
  subjectPlaceholder?: string
  subjects?: string[]
  title?: string
}

function ContactForm({
  action,
  buttonText,
  emailPlaceholder,
  errorContent,
  spinnerText,
  subjectLabel,
  successContent,

  bodyAsInput,
  bodyLabel,
  bodyPlaceholder,
  emailLabel,
  prefilledBody,
  prefilledSubject,
  subjectPlaceholder,
  subjects,
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
    function onBodyChangeChangeFn(evt: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
            { !prefilledSubject && (
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
                {(!subjects || subjects.length < 1) && !prefilledSubject && (
                  <input
                    name="subject"
                    onChange={onSubjectChange}
                    placeholder={subjectPlaceholder}
                    type="text"
                  />
                )}
              </div>
            )}
            { prefilledSubject && (
              <input
                name="subject"
                type="hidden"
                value={prefilledSubject}
              />
            )}
            <div className="form-row">
              { emailLabel && (
                <label htmlFor="email">{ emailLabel }</label>
              )}
              <input
                name="email"
                onChange={onEmailChange}
                placeholder={emailPlaceholder}
                type="text"
              />
            </div>
            { !prefilledBody && (
              <>
                <div className="form-row">
                  { bodyLabel && (
                    <label htmlFor="body">{ bodyLabel }</label>
                  )}
                  { bodyAsInput && (
                    <input
                      name="body"
                      onChange={onBodyChange}
                      placeholder={bodyPlaceholder}
                    />
                  )}
                  { !bodyAsInput && (
                    <textarea
                      name="body"
                      onChange={onBodyChange}
                      placeholder={bodyPlaceholder}
                    ></textarea>
                  )}
                </div>
                <div className="form-row">
                  <button type="submit">{ buttonText }</button>
                </div>
              </>
            )}
            { prefilledBody && (
              <input
                name="body"
                type="hidden"
                value={prefilledBody}
              />
            )}
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
