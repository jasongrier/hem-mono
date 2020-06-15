import React, { ReactElement, useEffect, useState, PropsWithChildren, useCallback } from 'react'

interface IProps {
  getApi: (openToaster: () => void) => void
  message: string

  delay?: number
}

function Toaster({ getApi, message, delay = 1000 }: IProps): ReactElement {
  const [open, setOpen] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<number>()

  useEffect(function init() {
    getApi(openToaster)

    return function cleanup() {
      if (!timeoutId) return
      window.clearTimeout(timeoutId)
    }
  }, [timeoutId])

  const toasterOnClick = useCallback(
    function toasterOnClickFn() {
      setOpen(false)
      window.clearTimeout(timeoutId)
      setTimeoutId(undefined)
    }, [],
  )

  function openToaster() {
    console.log(5)
    const newTimeoutId = window.setTimeout(function closeAfterDelay() {
      console.log(6)
      setOpen(false)
    }, delay)

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
      <p dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  )
}

export default Toaster
