import React, { ReactElement, useEffect, useCallback, useState, SyntheticEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import produce from 'immer'
import { isEmpty, noop, map } from 'lodash'
import { titleCase } from 'voca'
import moment from 'moment'
import { ElectronOnly } from '../../../../../../lib/components'
import { PlayPauseButton } from '../../../../../../lib/packages/hem-buttons'
import { adminApplyFilter, requestDeleteItems, requestReadItems, requestUpdateItems, IContentItem } from '../index'
import { RootState } from '../../../../index'
import { hasCategory, hasTag } from '../functions'

function AdminSettings(): ReactElement {
  // const { settings } = useSelector((state: RootState) => ({
  //   settings: state.content.settings,
  // }))

  // const dispatch = useDispatch()

  return (
    <ElectronOnly showMessage={true}>
      <div className="admin-settings">
        <ul>
          <li>Show empty tags</li>
          <li>Set release phase</li>
          <li>Show preview content</li>
        </ul>
      </div>
    </ElectronOnly>
  )
}

export default AdminSettings
