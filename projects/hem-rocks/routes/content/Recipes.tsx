import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { MainContentList } from '../../modules/content'
import { BASE_SITE_TITLE } from '../../config'

function Recipes(): ReactElement {

  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-recipes">
        <MainContentList
          currentFilter={currentFilter}
          category="recipes"
          title="Recipes"
        />
      </div>
    </>
  )
}

export default Recipes
