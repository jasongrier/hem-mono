import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { WebMovie } from '../../../../lib/modules/web-movie'
import { SoundLibraryRefreshHeroine, HemRefreshHeroine, GrandPianoHeroine } from '../../components/heroines'
import { MainContentList, getContentItemsFromList } from '../../modules/content'
import { ReleasePhase } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'
import { RootState } from '../../index'

function LifeInLetters(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-life-in-letters">
        <WebMovie />
      </div>
    </>
  )
}

export default LifeInLetters
