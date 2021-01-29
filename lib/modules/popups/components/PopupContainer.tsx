import React, { ReactElement, PropsWithChildren, useEffect, SyntheticEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery'
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

  const [locked, setLocked] = useState<boolean>(false)
  const [previousScrollY, setPreviousScrollY] = useState<number>()

  useEffect(function test() {
    console.log('***')
    console.log(currentlyOpenPopUp)
    console.log('***')
  }, [currentlyOpenPopUp])

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

  useEffect(function lockBody() {
    if (currentlyOpenPopUp === id && !locked) {
      document.body.classList.add('with-popup-open')

      const scrollY = $('.scroll-lock-content').scrollTop()

      setPreviousScrollY(scrollY)
      setLocked(true)

      $('.scroll-lock-container').css({
        overflow: 'hidden',
      })

      $('.scroll-lock-content').css({
        transform: `translateY(-${scrollY}px)`,
      })
    }

    else if (!currentlyOpenPopUp && locked) {
      document.body.classList.remove('with-popup-open')

      setLocked(false)

      $('.scroll-lock-container').css({
        overflow: 'scroll',
      })

      $('.scroll-lock-content').css({
        transform: 'translateY(0)',
      })
    }
  }, [currentlyOpenPopUp, locked])

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
