import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../../modules/core/content'
import { ExhibitsSubnav } from '../../../components/layout'
import { BASE_SITE_TITLE } from '../../../config'

function Exhibits(): ReactElement {
  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-exhibits">
        <ExhibitsSubnav />
        <MainContentList
          currentFilter={currentFilter}
          category="exhibits"
        />
      </div>
    </>
  )
}

export default Exhibits
