import React, { ReactElement } from 'react'
import { EmailForm } from '../../app'

function ProductTile(): ReactElement {
  return (
    <div className="post-download-popup">
      <h1>Thanks!</h1>
      <p>Your download should begin shortly.</p>
      <p>
        If it does not,
        <a href="">click here</a>.
      </p>
      <h2>While you're waiting, take a sec and sign up to HEM's mailing list</h2>
      <p>You'll receive updates about new packs, releases, and more.</p>
      <EmailForm />
    </div>
  )
}

export default ProductTile
