import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PopupContainer, openPopup } from '../../../lib/modules/popups'
import { setCurrentContentItem } from '../modules/content'
import { RootState } from '../index'

function Label(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const releases = allContentItems.filter(product => product.tags.includes('label'))

  // TODO: Duplicated code in the other routes. How to refactor this?
  function launchBuyPopup(release) {
    dispatch(setCurrentContentItem(release))
    dispatch(openPopup('detail-popup'))
  }

  return (
    <div className="page page-label">
      <h1>Label</h1>

    </div>
  )
}

export default Label
