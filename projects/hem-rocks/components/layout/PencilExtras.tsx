import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { WebsitePlayerControls } from '../packages/website-player'
import { setStuckPencil, setStuckPlayer } from '../../store/actions'
import { RootState } from '../../store'

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
  const { stuckPencil, stuckPlayer } = useSelector((state: RootState) => ({
    stuckPencil: state.app.stuckPencil,
    stuckPlayer: state.app.stuckPlayer,
  }))

  const dispatch = useDispatch()

  const stickPencilAt = 605
  const stickPlayerAt = 360

  useEffect(() => {
    window.addEventListener('scroll', evalScrollHeight)

    return function cleanup() {
      window.removeEventListener('scroll', evalScrollHeight)
    }
  }, [stuckPencil, stuckPlayer])

  function evalScrollHeight() {
    if (!stuckPencil && window.scrollY >= stickPencilAt) {
      dispatch(setStuckPencil(true))
    }

    if (stuckPencil && window.scrollY < stickPencilAt) {
      dispatch(setStuckPencil(false))
    }

    if (!stuckPlayer && window.scrollY >= stickPlayerAt) {
      dispatch(setStuckPlayer(true))
    }

    if (stuckPlayer && window.scrollY < stickPlayerAt) {
      dispatch(setStuckPlayer(false))
    }
  }

  return (
    <div className="pencil-extras">
      <ul className="extra-links-left">
        { renderItemGroup(items.left) }
      </ul>
      <ul className="extra-links-right">
        { renderItemGroup(items.right) }
      </ul>
      <div className="pencil-extras-website-player-controls">
        <WebsitePlayerControls />
      </div>
    </div>
  )
}

export default PencilExtras
