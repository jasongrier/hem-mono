import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Header, Footer } from '../../components/berlin-stock-photos'
import { MainContentList, getContentItemBySlug } from '../../modules/content'
import { BASE_SITE_TITLE } from '../../config'
import { RootState } from '../../index'

function Prints(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const parentImages = allContentItems.filter(item => item.physicalFormats.length)
  const prints = parentImages.map(parent => getContentItemBySlug(allContentItems, parent.physicalFormats))

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page berlin-stock-photos bsp-page bsp-prints-page">
        <Header />
        <h1>Prints</h1>
        <p>
          Archival Giclée Prints on Hahnemühle Photorag<br />
          <small>All prints A3 (18" x 24" approximately)</small><br />
          <small>Limit 1 print per customer</small><br />
          <small>Signed and numbered</small>
        </p>
        <div className="bsp-content">
          <MainContentList
            category="stock-photos"
            fixedFilters={[]}
            items={prints}
            linkTo={(item) => `/stock-photos-prints/${item.slug}`}
            noSplatter={ true }
          />
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default Prints
