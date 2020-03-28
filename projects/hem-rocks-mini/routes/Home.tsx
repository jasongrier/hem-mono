import React, { ReactElement } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GrandPianoDemos, GrandPianoHeroine } from '../components'
import { MediaContentList } from '../../../lib/components'
import { RootState } from '../index'

function Home(): ReactElement {
  const { siteContent } = useSelector((state: RootState) => ({
    siteContent: state.siteContent.siteContent,
  }))

  return (
    <div className="page page--home">
      <h1>
        <Link to="/">HEM</Link>
      </h1>

      <GrandPianoHeroine />

      <GrandPianoDemos />

      <nav>
        <ul>
          <li>
            <Link to="/sl1">Sound Library 1</Link>
            <Link to="/sl2">Sound Library 2</Link>
            <Link to="/past-releases">Past Releases</Link>
            <Link to="/archive">Archive</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route
          exact
          path="sl1"
          render={props =>
            <MediaContentList content={siteContent[props.location.pathname]} />
          }
        />

        <Route
          exact
          path="sl2"
          render={props =>
            <MediaContentList content={siteContent[props.location.pathname]} />
          }
        />

        <Route
          exact
          path="past-releases"
          render={props =>
            <MediaContentList content={siteContent[props.location.pathname]} />
          }
        />

        <Route
          exact
          path="archive"
          render={props =>
            <MediaContentList content={siteContent[props.location.pathname]} />
          }
        />
      </Switch>
    </div>
  )
}

export default Home
