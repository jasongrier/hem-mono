import React, { Fragment, ReactElement } from 'react'
import { IBaseProps } from './TaggedSubjectsListContainer'

interface IProps extends IBaseProps{
  match?: any
}

function TaggedSubjectsList({
  match,
  subjects,
  renderSubject
}: IProps): ReactElement {
  const name = match.params.name

  subjects = name === undefined
    ? subjects
    : subjects.filter(s => s.tags.indexOf(name) > -1)

  return (
    <>
      {subjects.map(renderSubject)}
    </>
  )
}

export default TaggedSubjectsList
