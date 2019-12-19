import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { CampaignMonitorForm } from '../../../../lib/components'

function PencilExtras(): ReactElement {
  return (
    <div className="pencil-extras">
      {/* <CampaignMonitorForm
        hasNameField={false}
        id="foo"
        placeholderText="Get updates in your inbox. Enter your email here! 🚀🚀🚀"
        submitButtonText="Sign up"
      /> */}
      <ul className="extra-links-left">
        <li>
          <Link to="/human-ear-music">About</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/blog">Sound &amp; Video</Link>
        </li>
        <li>
          <Link to="/human-ear-music">Label</Link>
        </li>
      </ul>
      <ul className="extra-links-right">
        <li>
          <a href="#">Github</a>
        </li>
        <li>
          <a href="#">NPM</a>
        </li>
        <li>
          <a href="#">Instagram</a>
        </li>
        <li>
          <a href="#">info@hem.rocks</a>
        </li>
      </ul>
    </div>
  )
}

export default PencilExtras
