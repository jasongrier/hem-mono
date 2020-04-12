import React, { PropsWithChildren, ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../../lib/modules/popups'
import { setCurrentContentItem, IContentItem } from '../modules/content'

interface IProps {
  contentItem: IContentItem
}

function LaunchDetailPopupButton({ children, contentItem }: PropsWithChildren<IProps>): ReactElement {
  const dispatch = useDispatch()

  const onClick = useCallback(
    function onClickFn() {
      dispatch(setCurrentContentItem(contentItem))
      dispatch(openPopup('detail-popup'))
    }, [],
  )

  return (
    <button
      className="action-button"
      onClick={onClick}
    >
      { children }
    </button>
  )
}

export default LaunchDetailPopupButton
