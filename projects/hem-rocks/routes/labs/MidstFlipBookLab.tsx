import React, { ReactElement, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { FileUploader } from '../../../../lib/components'
import { Header, Footer } from '../../components/layout'
import { ProtectedContent } from '../../components/ui'
import { BASE_SITE_TITLE } from '../../config'

function MidstFlipBookLab(): ReactElement {
  const onUpload = useCallback(
    function onUpload(file: File) {
      console.log(file)
    }, [],
  )

  return (
    <div className="page internal-page demos-home">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <ProtectedContent>
        <main>
          <h1>Midst Flip Book Lab</h1>
          <section>
            <h2>Generate Midst flip books!</h2>
            <FileUploader onUpload={onUpload} />
          </section>
        </main>
      </ProtectedContent>

      <Footer />
    </div>
  )
}

export default MidstFlipBookLab
