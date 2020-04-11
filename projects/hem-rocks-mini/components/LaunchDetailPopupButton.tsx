import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../../lib/modules/popups'
import { setCurrentProduct, IProduct } from '../modules/products'

interface IProps {
  contentItem: IContentItem
  text: string
}

function LaunchDetailPopupButton({ contentItem, text }: IProps): ReactElement {
  const dispatch = useDispatch()

  const onClick = useCallback(
    function onClickFn() {
      dispatch(setCurrentContentItem(contentItem))
      dispatch(openPopup('detail-popup'))
    }, [],
  )

  return (
    <button
      className="launch-detail-popup-button"
      onClick={onClick}
    >
      { text }
    </button>
  )
}

export default LaunchDetailPopupButton
