import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { slugify } from 'voca'
import { collapseTopBar } from '../index'
import { CampaignMonitorForm } from '../../../../../lib/components'

function MainNavItem(): ReactElement {
  const dispatch = useDispatch()

  const slug = slugify(name)

  return (
    <div className="email-popup">
      <h1>Get updates and new releases by email</h1>
      <CampaignMonitorForm id="foo" />
    </div>
  )
}

export default MainNavItem
