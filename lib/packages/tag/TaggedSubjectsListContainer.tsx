import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ITaggedSubject } from './types'
import TaggedSubjectsList from './TaggedSubjectsList';

export interface IBaseProps {
  subjects: ITaggedSubject[]
  renderSubject: (subject: any) => ReactElement // TODO: Why doesn't <T extends ITaggedSubject> work here??
}

interface IProps extends IBaseProps{
  urlPrefix?: string
}

function TaggedSubjectsListContainer({
  urlPrefix = 'category',
  subjects,
  renderSubject
}: IProps): ReactElement {

  const render = (props: any) => (
    <TaggedSubjectsList
      {...props}
      subjects={subjects}
      renderSubject={renderSubject}
    />
  )

  return (
    <Switch>
      <Route
        path={`/${urlPrefix}/:name?`}
        render={render}
      />
      <Route
        path="/"
        render={render}
      />
    </Switch>
  )
}

export default TaggedSubjectsListContainer
