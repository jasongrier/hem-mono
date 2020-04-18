import React, { PropsWithChildren, ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../../../../lib/modules/popups'
import { setCurrentContentItem, IContentItem } from '../index'

interface IProps {
  contentItem: IContentItem

  className?: string
  showPurchaseForm?: boolean
}

function LaunchDetailPopupButton({
  children,
  contentItem,

  className = '',
  showPurchaseForm = true
}: PropsWithChildren<IProps>): ReactElement {
  const dispatch = useDispatch()

  const onClick = useCallback(
    function onClickFn() {
      dispatch(setCurrentContentItem(contentItem))
      dispatch(openPopup(showPurchaseForm ? 'detail-popup' : 'detail-popup-hidden-purchase-form'))
    }, [],
  )

  return (
    <button
      className={`action-button ${className}`}
      onClick={onClick}
    >
      { children }
    </button>
  )
}

export default LaunchDetailPopupButton
