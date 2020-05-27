import React, { ReactElement, useEffect, useState, PropsWithChildren } from 'react'
import Cookies from 'js-cookie'

interface IProps {
  id: string

  closeIcon?: any
  delay?: number
  onDismiss?: () => void
}

function NagToaster({ children, id, closeIcon: CloseIcon, delay = 1000, onDismiss }: PropsWithChildren<IProps>): ReactElement {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(function init() {
    if (Cookies.get('hem-nag-toaster-' + id)) return

    window.setTimeout(function launchNag() {
      setOpen(true)
    }, delay)
  }, [])

  function dismissMethod() {
    setOpen(false)
  }

  function successMethod() {
    Cookies.set('hem-nag-toaster-' + id, 'true')
    setOpen(false)
  }

  return (
    <div
      className={`
        hem-nag-toaster
        ${open ? 'hem-nag-toaster-open' : ''}
      `}
      id={id}
    >
      { CloseIcon !== false && (
        <div
          className="hem-nag-toaster-close-button"
          onClick={() => {
            console.log('??')
            onDismiss()
            setOpen(false)
          }}
        >
          close
          { CloseIcon && <CloseIcon /> }
        </div>
      )}
      { open && (
        typeof children === 'function'
          ? children({
            dismiss: dismissMethod,
            success: successMethod,
          })
          : children
      )}
    </div>
  )
}

export default NagToaster
