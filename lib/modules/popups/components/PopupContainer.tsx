import React, { ReactElement, PropsWithChildren, useEffect, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disableBodyScroll, enableBodyScroll} from 'body-scroll-lock'
import { closePopup } from '../actions'

interface IProps {
  id: string

  closeIcon?: any
  escapeKeyCloses?: boolean
  overlayCloses?: boolean
}

function PopupContainer({
  children,
  id,

  closeIcon: CloseIcon,
  escapeKeyCloses = true,
  overlayCloses = true,
}: PropsWithChildren<IProps>): ReactElement {
  const { currentlyOpenPopUp, frozen, propsToChildren } = useSelector((state: any) => ({
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
    frozen: state.popups.frozen,
    propsToChildren: state.popups.propsToChildren,
  }))

  const dispatch = useDispatch()

  useEffect(function captureEscapeKey() {
    function bodyOnKeyDown(evt: any) {
      if (
        escapeKeyCloses
        && evt.keyCode === 27
        && currentlyOpenPopUp === id
      ) {
        dispatch(closePopup())
      }
    }

    document.body.addEventListener('keydown', bodyOnKeyDown)

    return function cleanup() {
      document.body.removeEventListener('keydown', bodyOnKeyDown)
    }
  }, [currentlyOpenPopUp])

  useEffect(function addBodyClass() {
    if (currentlyOpenPopUp) {
      document.body.classList.add('popup-open')
    }

    else {
      document.body.classList.remove('popup-open')
    }
  }, [currentlyOpenPopUp])

  useEffect(function bodyScrollLock() {
    const targetEl = document.getElementById(id)

    if (!targetEl) return

    if (currentlyOpenPopUp) {
      disableBodyScroll(targetEl)
    }

    else {
      enableBodyScroll(targetEl)
    }
  }, [currentlyOpenPopUp])

  const isOpen = currentlyOpenPopUp === id

  return (
    <div
      className={`
        hem-popup-container
        ${ isOpen ? ' hem-popup-container-open' : '' }
      `}
      id={id}
      onClick={(evt: SyntheticEvent<HTMLDivElement>) => {
        if (!overlayCloses) return
        dispatch(closePopup())
      }}
    >
      <div
        className="hem-popup-content"
        onClick={(evt: SyntheticEvent<HTMLDivElement>) => {
          evt.stopPropagation()
        }}
      >
        { frozen === false && CloseIcon !== false && (
          <div
            className="hem-popup-close"
            onClick={() => {
              dispatch(closePopup())
            }}
          >
            close
            { CloseIcon && <CloseIcon /> }
          </div>
        )}
        { isOpen && (
          typeof children === 'function'
            ? children(propsToChildren)
            : children
        )}
      </div>
    </div>
  )
}

export default PopupContainer
