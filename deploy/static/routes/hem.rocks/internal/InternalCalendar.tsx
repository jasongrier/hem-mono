import React, { ReactElement } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { AdminManualTaskRunner, AdminItem, AdminList } from '../../../modules/core/content'
import { BASE_SITE_TITLE } from '../../../config'

function InternalCalendar(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-internal page-internal-calendar">
        <h1>Calendar</h1>
        <p>Calendar comes in roughly two week intervals and corresponds to a newsletter being sent out</p>
        <p>Newsletters are sent in the first and third weeks of each month</p>
        <p>The first week's newsletter is generally devoted to news flashes, guest stars, and product releases</p>
        <p>The second week's newsletter is generally devoted to follow-ups, educational material, articles, and new tracks</p>
        <p>Every newsletter links to social media, Github, and donation page</p>
        <div className="internal-calendar-item">
          <h2>14. July 2020: Soft Launch</h2>
          <p><strong>No Newsletter</strong></p>
          <ul>
            <li>Checkout flow</li>
            <li>File download</li>
            <li>Elastic pricing</li>
            <li>Google analytics</li>
            <li>Mailing list nag</li>
            <li>Cookie nag</li>
            <li>Press</li>
            <li>Website player</li>
            <li>Label timeline</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default InternalCalendar
