import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { VenueSubnav } from '../../components/layout'
import { MainContentList, hasCategory } from '../../modules/content'
import { BASE_SITE_TITLE } from '../../config'
import { RootState } from '../../index'

function VenueMerch(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const venueMerchItems = allContentItems.filter(item => hasCategory(item, 'venue-merch'))
  const hemMerchItems = allContentItems.filter(item => hasCategory(item, 'merch'))
  const items = [].concat(venueMerchItems, hemMerchItems)

  items.sort((a, b) => {
    // @ts-ignore
    return moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY')
  })

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-venue">
        <h1>Venue Merch</h1>
        <VenueSubnav />
        <MainContentList
          category="venue-merch"
          items={items}
        />
      </div>
    </>
  )
}

export default VenueMerch
