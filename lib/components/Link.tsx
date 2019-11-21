import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export interface ILink {
  destination: string
  text: string
  title: string
  type: string
}

interface IProps extends ILink {}

export default function({
  destination,
  text,
  title,
  type,
}: IProps): ReactElement {
  if (type === 'internal') {
    return (
      <Link
        className="link"
        title={title}
        to={destination}
      >
        {text}
      </Link>
    )
  }

  else {
    return (
      <a
        className="link link--external"
        href={destination}
        target="blank"
        title={title}
      >
        {text}
      </a>
    )
  }
}
