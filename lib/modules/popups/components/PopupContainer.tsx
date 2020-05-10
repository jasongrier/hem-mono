import React, { ReactElement, PropsWithChildren, useState, useEffect, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disableBodyScroll, enableBodyScroll} from 'body-scroll-lock'
import { closePopup } from '../index'

interface IProps {
  id: string

  closeIcon?: any
}

function PopupContainer({ children, id, closeIcon: CloseIcon }: PropsWithChildren<IProps>): ReactElement {
  const { currentlyOpenPopUp, propsToChildren } = useSelector((state: any) => ({
    propsToChildren: state.popups.propsToChildren,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
  }))

  const dispatch = useDispatch()

  const [windowScrollY, setWindowScrollY] = useState(0)

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
  }, [currentlyOpenPopUp, windowScrollY])

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
