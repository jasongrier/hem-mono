import React, { ReactElement, useEffect, useState, PropsWithChildren, useCallback } from 'react'

interface IProps {
  message: string

  className?: string
  delay?: number | false
  delayAfterClick?: number
  onClose?: () => void
}

function Toaster({ message, onClose, className, delay = 3000, delayAfterClick = 0 }: IProps): ReactElement {
  const [open, setOpen] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<number>()

  useEffect(openToaster, [])

  useEffect(function doCleanup() {
    return function cleanup() {
      window.clearTimeout(timeoutId)
    }
  }, [timeoutId])

  const toasterOnClick = useCallback(
    function toasterOnClickFn() {
      setTimeout(function() {
        if (timeoutId) {
          window.clearTimeout(timeoutId)
        }
        setOpen(false)
        setTimeoutId(undefined)
        onClose && onClose()
      }, delayAfterClick)
    }, [],
  )

  function openToaster() {
    if (delay) {
      const newTimeoutId = window.setTimeout(function closeAfterDelay() {
        setOpen(false)
      }, delay)
      setTimeoutId(newTimeoutId)
    }

    setOpen(true)
  }

  return (
    <div
      className={`
        hem-toaster
        ${ className ? className : '' }
        ${ open ? 'hem-toaster-open' : '' }
      `}
      onClick={toasterOnClick}
    >
      <div className="hem-toaster-box">
        <p dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    </div>
  )
}

export default Toaster
