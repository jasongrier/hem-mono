import React, { ReactElement } from 'react'

interface IProps {
  onClick: () => void
  selected: boolean
  title: string
}

function SubQuizQuestion({ onClick, selected, title }: IProps): ReactElement {
  return (
    <div
      className="sub-quiz-question"
      onClick={onClick}
    >
      <div className="sub-quiz-question-radio">
        {selected &&
          <div className="sub-quiz-question-radio-active" />
        }
      </div>
      <div className="sub-quiz-question-title">{ title }</div>
    </div>
  )
}

export default SubQuizQuestion
