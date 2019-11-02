import React, { ReactElement } from 'react'
import Seurat from '../components/Seurat'
import WebFeatureFooter from '../components/WebFeatureFooter'

// TODO: Switch to Webpack
//@ts-ignore
import tracingSource from '../assets/tracing-sources/push.jpg'

function Home(): ReactElement {
  return (
    <div className="page page--home">
      <img
        className="trc-src trc-src--proportion-test"
        src={tracingSource}
      />
      <div className="find-center" />
      <Seurat />
      <WebFeatureFooter />
    </div>
  )
}

export default Home
