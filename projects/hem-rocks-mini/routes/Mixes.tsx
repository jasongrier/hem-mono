import React, { ReactElement, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { find } from 'lodash'
import { MainContentList, contentItemToTrack } from '../modules/content'
import { TrackPlayPauseButton, ITrack } from '../../../lib/modules/player'
import { BASE_SITE_TITLE } from '../config'

function Mixes(): ReactElement {
  const { filter: currentFilter } = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks">
        <MainContentList
          currentFilter={currentFilter}
          category="mixes"
          title="Mixes"
        >
          {(item) => {
            const track = contentItemToTrack(item, '')
            return (
              <TrackPlayPauseButton track={track} />
            )
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default Mixes
