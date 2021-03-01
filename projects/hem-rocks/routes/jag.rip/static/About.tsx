import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation, useParams } from 'react-router-dom'
import { MainContentList } from '../../modules/core/content'
import { PROJECT_CONFIGS } from '../../config'

function About(): ReactElement {
  const { pathname }: any = useLocation()
  const { filter: currentFilter }: any = useParams()

  return (
    <div className="page page-about">
      <Helmet>
        <title>{ PROJECT_CONFIGS['jag.rip'].HTML_HEAD_META.BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="main-content-section first-main-content-section">
        <p>
          [PIC]
          <small>Photo by Line Gøttsche</small>
        </p>
        <p>
          Lorem ipsum
        </p>
        <p>
          Lorem ipsum
        </p>
        <p>
          [CV — Arts &amp; Culture] | [CV — Corporate]
        </p>
      </div>
    </div>
  )
}

export default About
