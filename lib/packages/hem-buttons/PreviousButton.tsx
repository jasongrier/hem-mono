import React, { ReactElement } from 'react'
import NextButton from './NextButton'

interface IProps {
  onClick: () => void
}

const styleSheet = `
  .hem-previous-button .hem-next-button {
    transform: rotate(180deg);
  }
`

function PreviousButton({ onClick }: IProps): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div className="hem-previous-button">
        <NextButton onClick={onClick} />
      </div>
    </>
  )
}

export default PreviousButton
