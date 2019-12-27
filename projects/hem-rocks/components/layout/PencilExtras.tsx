import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { WebsitePlayerControls } from '../packages/website-player'

interface IPencilExtrasItem {
  text: string
  type: string
  url: string
}

interface IProps {
  items: {
    left: IPencilExtrasItem[]
    right: IPencilExtrasItem[]
  }
}

function renderItemGroup(items: IPencilExtrasItem[]) {
  return items.map(({ text, type, url }, index) => (
    type === 'internal'
      ?
      <li key={index}>
        <Link to={url}>
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </Link>
      </li>
      :
      <li key={index}>
        <a href={url}>
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </a>
      </li>
    )
  )
}

function PencilExtras({ items }: IProps): ReactElement {
  const [stuck, setStuck] = useState()

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (!stuck && window.scrollY >= 605) {
        setStuck(true)
      }

      if (stuck && window.scrollY < 605) {
        setStuck(false)
      }
    })
  }, [stuck])

  return (
    <div className={classnames({
      'pencil-extras': true,
      'pencil-extras-stuck': stuck,
    })}>
      <ul className="extra-links-left">
        { renderItemGroup(items.left) }
      </ul>
      <ul className="extra-links-right">
        { renderItemGroup(items.right) }
      </ul>
      <div className="pencil-extras-website-player-controls">
        <WebsitePlayerControls expanded={stuck ? true : null} />
      </div>
    </div>
  )
}

export default PencilExtras
