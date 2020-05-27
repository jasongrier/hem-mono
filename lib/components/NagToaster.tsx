import React, { ReactElement, useEffect, useState, PropsWithChildren } from 'react'

interface IProps {
  id: string

  closeIcon?: any
  delay?: number
  onDismiss?: () => void
}

function NagToaster({ children, id, closeIcon: CloseIcon, delay = 1000, onDismiss }: PropsWithChildren<IProps>): ReactElement {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(function init() {
    window.setTimeout(function launchNag() {
      setOpen(true)
    }, delay)
  }, [])

  function dismissMethod() {
    setOpen(false)
  }

  function successMethod() {
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
            onDismiss && onDismiss()
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
