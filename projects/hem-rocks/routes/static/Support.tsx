import React, { ReactElement, useCallback, useState, SyntheticEvent, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import uuid from 'uuid/v1'
import { assetHostHostname } from '../../functions'
import { Spinner } from '../../../../lib/components'
import { BASE_SITE_TITLE } from '../../config'

const subjects = [
  'Choose one',
  'Problems downloading',
  'Trouble using sound packs',
  'Physical order not received or defective',
  'Website bugs or suggestions',
  'Something else',
]

function Support(): ReactElement {
  const [body, setBody] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [id, setId] = useState<string>()
  const [subject, setSubject] = useState<string>(subjects[0])
  const [uiState, setUiState] = useState<number>(0)

  const onSubjectChange = useCallback(
    function onSubjectChangeFn(evt: SyntheticEvent<HTMLSelectElement>) {
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
        fetch(
          assetHostHostname() + '/hem-rocks/api/?hem-cmd=support-claim',
          {
            body: JSON.stringify({ body, email, messageId, subject }),
            method: 'post',
          }
        )
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
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-support">
        <div className="hem-contact-form">
          { uiState === 0 && (
            <div className="hem-contact-form-default">
              <h1>Need help?</h1>
              <form
                autoComplete="off"
                className="hem-contact-form"
                onSubmit={onSubmit}
              >
                <div className="form-row">
                  <label htmlFor="subject">What seems to be the problem? (choose one)</label>
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
                </div>
                <div className="form-row">
                  <label htmlFor="body">Your email (so we can reach you)</label>
                  <input
                    name="email"
                    onChange={onEmailChange}
                    placeholder="hrvoje.horvat@gmail.com"
                    type="text"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="body">Please say more</label>
                  <textarea
                    name="body"
                    onChange={onBodyChange}
                    placeholder="Why can't I download my files a second time?!"
                  ></textarea>
                </div>
                <div className="form-row">
                  <button type="submit">Send</button>
                </div>
              </form>
            </div>
          )}
          { uiState === 1 && (
            <div className="hem-contact-form-loading">
              <h1>Sending...</h1>
              <Spinner />
            </div>
          )}
          { uiState === 2 && (
            <div className="hem-contact-form-success">
              <h1>Got it</h1>
              <p>Someone will be contacting you soon about your question.</p>
              <p>Your case id is:</p>
              <p><strong>{ id }</strong></p>
              <p className="contact-form-home-link">&larr; <Link to="/">Home</Link></p>
            </div>
          )}
          { uiState === 3 && (
            <div className="hem-contact-form-error">
              <h1>Uh oh</h1>
              <p>For some reason, your message could not be sent.</p>
              <p>Please send an e-mail to: <a href="mailto:support@hem.rocks">support@hem.rocks</a></p>
              <p className="contact-form-home-link">&larr; <Link to="/">Home</Link></p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Support
