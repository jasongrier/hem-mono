import React, { ReactElement, useCallback } from 'react'
import ReactGA from 'react-ga'
import { EmailForm } from '../../app'

interface IProps {
  // download: IContentItem
}

function PostDownloadPopup({ }: IProps): ReactElement {

  const onFormSubmitted = useCallback(
    function onFormSubmittedFn() {
      ReactGA.event({
        category: 'User',
        action: 'Signed up for mailing list after purchase',
      })
    }, [],
  )

  return (
    <div className="post-download-popup">
      <header>
        <h1>Thanks!</h1>
      </header>
      <div className="post-download-popup-content">
        <p>Your download should begin shortly.</p>

        <p>
          If it doesn't, <a href="">click here</a>.
        </p>

        <div className="post-download-popup-email-form">
          <EmailForm onFormSubmitted={onFormSubmitted} />
        </div>
      </div>
    </div>
  )
}

export default PostDownloadPopup
