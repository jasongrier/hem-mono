import React, { ReactElement, useEffect, useState, PropsWithChildren, useCallback } from 'react'

interface IProps {
  message: string

  delay?: number
}

function Toaster({ message, delay = 3000 }: IProps): ReactElement {
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
      window.clearTimeout(timeoutId)
      setOpen(false)
      setTimeoutId(undefined)
    }, [],
  )

  function openToaster() {
    const newTimeoutId = window.setTimeout(function closeAfterDelay() {
      setOpen(false)
    }, delay)

    setOpen(true)
    setTimeoutId(newTimeoutId)
  }

  return (
    <div
      className={`
        hem-toaster
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
