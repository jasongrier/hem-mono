import React, { Fragment, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Hide from '../../components/Hide' // TODO: In a registry setup, this would require Hide to also be a package
import getTagsCounts from './get-tags-counts'
import { ITaggedSubject } from './types'

interface IProps {
  subjects: ITaggedSubject[]
  urlPrefix?: string
}

function TagFilter({ subjects, urlPrefix = 'category' }: IProps): ReactElement {
  const tags = getTagsCounts(subjects)
  return (
    <div className="hem-tag-filter">
      {tags.map(tag => (
        <Fragment key={tag.name}>
          <Hide on={`/${urlPrefix}/${tag.name}`}>
            <Link
              key={tag.name}
              to={`/${urlPrefix}/${tag.name}`}
            >
              {tag.name}
            </Link>
            <Link
              key={tag.name}
              to="/"
            >
              {tag.name}
            </Link>
          </Hide>
        </Fragment>
      ))}
    </div>
  )
}

export default TagFilter
