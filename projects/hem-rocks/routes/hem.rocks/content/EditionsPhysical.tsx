import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../../modules/core/content'
import { EditionsSubnav } from '../../../components/layout'
import { BASE_SITE_TITLE } from '../../../config'

function EditionsPhysical(): ReactElement {
  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-editions page-editions-physical page-with-subnav page-with-banner">
        <EditionsSubnav />
        <MainContentList
          currentFilter={currentFilter}
          category="editions-physical"
        />
      </div>
    </>
  )
}

export default EditionsPhysical
