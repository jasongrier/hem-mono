import { noop } from 'lodash'
import React, { PropsWithChildren, ReactElement, useCallback, useEffect, useState } from 'react'

interface IProps {
  delay?: number
  onClick?: () => void
}

// TODO: Move to common
function TipPop({ children, delay = 300, onClick = noop }: PropsWithChildren<IProps>): ReactElement {
  const [open, setOpen] = useState()
  const [timeoutId, setTimeoutId] = useState()

  const onMouseEnter = useCallback(
    // TODO: All projects; Use named functions in hooks, even useEffect
    function onMouseEnter() {
      setTimeoutId(window.setTimeout(() => {
        setOpen(true)
      }, delay))
    }, []
  )

  const onMouseLeave = useCallback(
    function onMouseLeave() {
      setOpen(false)
      timeoutId && clearTimeout(timeoutId)
      setTimeoutId(null)
    }, [timeoutId]
  )

  const style = `
    .tip-pop {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9999;
      width: 100%;
      height: 100%;
      opacity: 0;
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid #000;
      box-sizing: border-box;
      transition: all 250ms;
      justify-content: center;
      align-items: center;
    }

    .tip-pop-open {
      opacity: 1;
    }

    .tip-pop-content {
      padding: 10px;
      color: #000;
    }

    .tip-pop-content h2 {
      margin: 0 0 10px 0;
    }

    .tip-pop-content p {
      margin: 0 0 10px 0;
    }
  `

  return (
    <div
      className={`tip-pop ${open ? 'tip-pop-open' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <style dangerouslySetInnerHTML={{__html: style}} />
      <div className="tip-pop-content">
        { children }
      </div>
    </div>
  )
}

export default TipPop
