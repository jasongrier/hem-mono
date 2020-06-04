import React, { ReactElement } from 'react'

function Checklists(): ReactElement {
  return (
    <div className="page page-internal page-internal-checklists clearfix">
      <h1>Checklists</h1>

      <div className="page-internal-link-group">
        <h2>Daily</h2>
        <h3>Check these inboxes</h3>
        <ul>
          <li><input type="checkbox" />Patreon</li>
          <li><input type="checkbox" />Twitter</li>
          <li><input type="checkbox" />Instagram</li>
          <li><input type="checkbox" />Facebook</li>
          <li><input type="checkbox" />Soundcloud</li>
        </ul>
        <h3>Check these stats</h3>
        <ul>
          <li><input type="checkbox" />Google Analytics</li>
          <li><input type="checkbox" />Twitter Analytics</li>
          <li><input type="checkbox" />Instagram Analytics</li>
          <li><input type="checkbox" />Facebook Analytics</li>
          <li><input type="checkbox" />Soundcloud Analytics</li>
        </ul>
        <h3>Check these accounts</h3>
        <ul>
          <li><input type="checkbox" />paypal@hem.rocks</li>
        </ul>
      </div>
      <div className="page-internal-link-group">
        <h2>Weekly</h2>
        <h3>Post something to</h3>
        <ul>
          <li><input type="checkbox" />Patreon</li>
          <li><input type="checkbox" />Twitter</li>
          <li><input type="checkbox" />Instagram</li>
          <li><input type="checkbox" />Facebook</li>
          <li><input type="checkbox" />Email</li>
        </ul>
      </div>
      <div className="page-internal-link-group">
        <h2>Monthly</h2>
        <h3>Send</h3>
        <ul>
          <li><input type="checkbox" />Email newsletter</li>
          <li><input type="checkbox" />Press releases</li>
        </ul>
      </div>
      <div className="page-internal-link-group">
        <h2>Venue Care</h2>
        <h3>Before every event</h3>
        <ul>
          <li><input type="checkbox" />Sticky the artist's merch</li>
          <li><input type="checkbox" />Set `activeLiveStream` in the admin</li>
        </ul>
        <h3>After every event</h3>
        <ul>
          <li><input type="checkbox" />Unsticky the artist's merch</li>
          <li><input type="checkbox" />Unset `activeLiveStream` in the admin</li>
        </ul>
      </div>
    </div>
  )
}

export default Checklists
