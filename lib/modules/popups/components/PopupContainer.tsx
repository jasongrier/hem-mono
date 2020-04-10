import React, { ReactElement, PropsWithChildren, SFC, useEffect, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '../index'

interface IProps {
  id: string

  closeIcon?: SFC
}

function PopupContainer({ children, id, closeIcon: CloseIcon }: PropsWithChildren<IProps>): ReactElement {
  const { currentlyOpenPopUp } = useSelector((state: any) => ({
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
  }))

  const dispatch = useDispatch()

  useEffect(function addBodyClass() {
    if (currentlyOpenPopUp) {
      document.body.classList.add('popup-open')
    }

    else {
      document.body.classList.remove('popup-open')
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
        <div
          className="hem-popup-close"
          onClick={() => {
            dispatch(closePopup())
          }}
        >
          close
          { CloseIcon && <CloseIcon /> }
        </div>
        { isOpen && children }
      </div>
    </div>
  )
}

export default PopupContainer
