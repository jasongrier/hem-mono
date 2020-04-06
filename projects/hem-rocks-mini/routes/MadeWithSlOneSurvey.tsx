import React, { ReactElement, useState, useCallback, SyntheticEvent } from 'react'
import produce from 'immer'
import { FileUploader } from '../../../lib/components'

function MadeWithSlOneSurvey(): ReactElement {
  const [uploaded, setUploaded] = useState(false)
  const [uploadError, setUploadError] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    email: '',
    description: '',
  })

  const onFormDataChanged = useCallback(
    function onFormDataChangedFn(evt: SyntheticEvent<HTMLInputElement>) {
      setFormData(produce(formData, draftFormData => {
        if (
          evt.currentTarget.name === 'title'
          || evt.currentTarget.name === 'artist'
          || evt.currentTarget.name === 'email'
          || evt.currentTarget.name === 'description'
        ) {
          draftFormData[evt.currentTarget.name] = evt.currentTarget.value
        }
      }))
    }, [],
  )

  const onUpload = useCallback(
    function onUploadFn() {
      setUploaded(true)
    }, [],
  )

  const onUploadError = useCallback(
    function onUploadErrorFn() {
      setUploadError(true)
    }, [],
  )

  const onSubmit = useCallback(
    function onSubmitFn() {
    }, [],
  )

  return (
    <div className="page page-made-with-sl-one-survey">
      <h1>Made something with HEM Sound Library?</h1>
      <h2>Share it here!</h2>
      <p>All submissions will be showcased on HEM's website.</p>
      {!uploaded && !uploadError && (
        <form onSubmit={onSubmit}>
          <div className="submission-info">
            <input
              type="text"
              name="title"
              required
              onChange={onFormDataChanged}
            />
            <input
              type="text"
              name="artist"
              required
              onChange={onFormDataChanged}
            />
            <input
              type="text"
              name="email"
              required
              onChange={onFormDataChanged}
            />
            <input
              type="text"
              name="description"
              required
              onChange={onFormDataChanged}
            />
          </div>

          <div className="send-link">
            <h3>Send a link (Soundcloud, Bandcamp, your website, etc)</h3>
            <input type="file" name="submission-link" />
          </div>

          <p>– or –</p>

          <div className="upload-file">
            <h3>Upload a file (WAV, AIFF, Mp3)</h3>
            {uploaded && (
              <FileUploader
                onUpload={onUpload}
                onUploadError={onUploadError}
              />
            )}
          </div>
        </form>
      )}
      {uploaded && !uploadError && (
        <div className="upload-success">
          <h1>Thank you!</h1>
        </div>
      )}
      {uploadError && (
        <div className="upload-success">
          <h1>Thank you!</h1>
        </div>
      )}
    </div>
  )
}

export default MadeWithSlOneSurvey
