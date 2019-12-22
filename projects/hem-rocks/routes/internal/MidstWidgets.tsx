import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Header, InternalHeader, Footer } from '../../components/layout'
import { ProtectedContent } from '../../components/ui'
import { BASE_SITE_TITLE } from '../../config'

function MidstWidgets(): ReactElement {
  return (
    <div className="page internal-page midst-widgets">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <ProtectedContent header="Enter password to view this content">
        <InternalHeader />

        <main>
          <h1>Midst Widgets</h1>
          <section>
            <h2>Widget #1: Native Midst Widget</h2>
            <p>The Native Midst Widget is for content owners, publishers, internal users, and those who are generally comfy editing their own website code.</p>
          </section>
          <section>
            <h2>Widget #2: IFrame Midst Widget</h2>
            <p>The IFrame Midst Widget is for public users .</p>
          </section>
        </main>
      </ProtectedContent>

      <Footer />
    </div>
  )
}

export default MidstWidgets
