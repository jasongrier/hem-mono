import React, { ReactElement, PropsWithChildren, useEffect, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disableBodyScroll, enableBodyScroll} from 'body-scroll-lock'
import { closePopup } from '../actions'

interface IProps {
  id: string

  closeIcon?: any
}

function PopupContainer({ children, id, closeIcon: CloseIcon }: PropsWithChildren<IProps>): ReactElement {
  const { currentlyOpenPopUp, propsToChildren } = useSelector((state: any) => ({
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
    propsToChildren: state.popups.propsToChildren,
  }))

  const dispatch = useDispatch()

  useEffect(function init() {
    function bodyOnKeyDown(evt: any) {
      if (evt.keyCode === 27) {
        dispatch(closePopup())
      }
    }

    document.body.addEventListener('keydown', bodyOnKeyDown)

    return function cleanup() {
      document.body.removeEventListener('keydown', bodyOnKeyDown)
    }
  }, [])

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
        dispatch(closePopup())
      }}
    >
      <div
        className="hem-popup-content"
        onClick={(evt: SyntheticEvent<HTMLDivElement>) => {
          evt.stopPropagation()
        }}
      >
        { CloseIcon !== false && (
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
