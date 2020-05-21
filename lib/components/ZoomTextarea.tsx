import React, { ReactElement, useState, useCallback, PropsWithChildren, Children, SyntheticEvent } from 'react'
import { CloseButton } from '../packages/hem-buttons'

interface IProps {
  name: string
  onChange: (value: string) => void
  value: string
}

const styleSheet = `
  .hem-zoom-textarea {

  }

  .hem-zoom-textarea-expanded-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99998;
    background-color: rgba(0, 0, 0, 0.9);
  }

  .hem-zoom-textarea-expanded-content {
    position: fixed;
    top: 40px;
    left: 40px;
    bottom: 40px;
    right: 40px;
    z-index: 99999;
  }

  .hem-zoom-textarea-collapse-button {
    position: absolute;
    top: 0;
    right: -2px;
  }

  .hem-zoom-textarea-textarea {
    width: calc(100vw - 200px);
    min-height: calc(100vh - 120px);
    padding-right: 80px;
    resize: none;
  }

  .hem-zoom-textarea input {

  }
`

function ZoomTextarea({ name, onChange, value }: IProps): ReactElement {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [displayText, setDisplayText] = useState<string>()

  const inputOnClick = useCallback(
    function inputOnClickFn() {
      setExpanded(true)
    }, [],
  )

  const closeButtonOnCLick = useCallback(
    function closeButtonOnCLickFn() {
      setExpanded(false)
    }, [],
  )

  const textareaOnChange = useCallback(
    function textareaOnChangeFn(evt: SyntheticEvent<HTMLTextAreaElement>) {
      onChange(evt.currentTarget.value)
      setDisplayText(evt.currentTarget.value.substr(0, 150) + '...')
    }, [],
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div className={`hem-zoom-textarea${expanded ? ' expanded' : ''}`}>
        { expanded && (
          <div className="hem-zoom-textarea-expanded-overlay">
            <div className="hem-zoom-textarea-expanded-content">
              <div className="hem-zoom-textarea-collapse-button">
                <CloseButton onClick={closeButtonOnCLick} />
              </div>
              <textarea
                className="hem-zoom-textarea-textarea"
                name={name}
                onChange={textareaOnChange}
                value={value}
              />
            </div>
          </div>
        )}
        { !expanded && (
          <input
            value={displayText}
            onClick={inputOnClick}
          />
        )}
      </div>
    </>
  )
}

export default ZoomTextarea