import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Header, Footer } from '../../components/berlin-stock-photos'
import { MainContentList, getContentItemBySlug } from '../../modules/core/content'
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
        <title>{ BASE_SITE_TITLE }: Prints</title>
        <meta name="description" content="Lushness. Weirdness. Greenery. Grit. Cheap stock photos from Berlin, Germany, updated daily." />
      </Helmet>
      <div className="page berlin-stock-photos bsp-page bsp-prints-page">
        <Header />
        <div className="bsp-content">
          <h1>Prints</h1>
          <p>
            Archival Giclée Prints on Hahnemühle Photorag<br />
            <small>All prints A3 (18" x 24" approximately)</small><br />
            <small>Limit 1 print per customer</small><br />
            <small>Signed and numbered</small>
          </p>
          <MainContentList
            category="stock-photos"
            fixedFilters={[]}
            items={prints}
            linkTo={(item) => `/stock-photos-prints/${item.slug}`}
            noSplatter={ true }
          />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Prints
