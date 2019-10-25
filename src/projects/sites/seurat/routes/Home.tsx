import React, { ReactElement } from 'react'
import Seurat from '../components/Seurat'
import WebFeatureFooter from '../components/WebFeatureFooter'

function Home(): ReactElement {
  return (
    <div className="page page--home">
      <Seurat />
      <WebFeatureFooter />
    </div>
  )
}

export default Home
