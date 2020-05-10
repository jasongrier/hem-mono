import React, { PropsWithChildren, ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentContentItem, IContentItem } from '../index'

interface IProps {
  contentItem: IContentItem
  tag: string

  className?: string
}

function LaunchDetailPopupButton({
  children,
  contentItem,
  tag,

  className = '',
}: PropsWithChildren<IProps>): ReactElement {
  const dispatch = useDispatch()

  const onClick = useCallback(
    function onClickFn() {
      // dispatch(setCurrentContentItem(contentItem))
    }, [],
  )

  return (
    <div
      className={`action-button ${className}`}
      onClick={onClick}
    >
      <Link to={`/${tag}/${contentItem.slug}`}>
        { children }
      </Link>
    </div>
  )
}

export default LaunchDetailPopupButton
