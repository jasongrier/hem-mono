import React, { ReactElement, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Scrollbars from 'react-scrollbars-custom'
import { slugify } from 'voca'
import { compact, intersectionBy } from 'lodash'
import $ from 'jquery'
import moment from 'moment'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../../../lib/modules/popups'
import { MainContentBox } from './index'
import { setCurrentContentItem, IContentItem } from '../index'
import { CampaignMonitorForm } from '../../../../../lib/components'
import { RootState } from '../../../index'

interface IProps {
  blurb: string
  buttonText: string
  children: (contentItem: IContentItem) => any
  infoPopupTitle: string
  tag: string
  title: string

  campaignMonitorId?: string
  exclusiveFilters?: string[]
  filters?: string[]
  highlights?: string[]
  infoPopupText?: string
}

function MainContentList({
  blurb,
  buttonText,
  infoPopupTitle,
  children,
  tag,
  title,

  campaignMonitorId,
  exclusiveFilters = [],
  filters = [],
  highlights,
  infoPopupText,
}: IProps): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const [filter, setFilter] = useState('all')
  const [filtersOriginalTop, setFiltersOriginalTop] = useState(null)

  filters = compact(['All'].concat(exclusiveFilters).concat(filters))

  let contentItems = allContentItems.filter(item =>
    item.tags.includes(tag) && item.published && !item.sticky
  )

  let stickyContentItems = allContentItems.filter(
    item => item.tags.includes(tag) && item.published && item.sticky
  )

  if (filter === 'all') {
    contentItems = contentItems.filter(item =>
      intersectionBy(item.tags, exclusiveFilters.map(slugify)).length === 0
    )
  }

  else {
    contentItems = contentItems.filter(item => item.tags.includes(filter))
    stickyContentItems = stickyContentItems.filter(item => item.tags.includes(filter))
  }

  function sortFn(a: IContentItem, b: IContentItem) {
    // @ts-ignore
    return moment(b.date, 'DD-MM-YYYY') - moment(a.date, 'DD-MM-YYYY')
  }

  contentItems.sort(sortFn)
  stickyContentItems.sort(sortFn)

  contentItems = stickyContentItems.concat(contentItems)

  function launchDetailPopup(pack: IContentItem) {
    dispatch(setCurrentContentItem(pack))
    dispatch(openPopup('detail-popup'))
  }

  return (
    <div className="main-content-list clearfix">
      <h1>
        { title }
        { infoPopupText && (
          <div
            className="header-info-badge"
            onClick={() => {
              dispatch(openPopup(tag + '-info'))
            }}
          >
            i
          </div>
        )}
      </h1>
      <div className="main-content-blurb"
        dangerouslySetInnerHTML={{__html: blurb}}
      />
      <div
        hidden
        className={`
          main-content-highlights clearfix
          ${highlights ? 'has-highlights' : ''}
        `}
      >
        {highlights && (
          highlights.map(highlight => (
            <div
              className="main-content-highlight"
              dangerouslySetInnerHTML={{__html: '– ' + highlight}}
              key={highlight}
            />
          ))
        )}
        {campaignMonitorId && (
          <div className="main-content-highlights-mailing-list-form">
            <CampaignMonitorForm
              id={campaignMonitorId}
              hasNameField={false}
              labelForName={null}
              labelForEmail="Sign up to receive updates"
              submitButtonText="Sign up"
            />
          </div>
        )}
      </div>
      {filters.length > 1 && (
        <div className="main-content-filters clearfix">
          <h3>Filter:</h3>
          { filters.map(name => (
            <div
              className={`
                main-content-filter
                ${ filter === slugify(name) ? 'active' : '' }
                ${ exclusiveFilters.includes(name) ? 'exclusive-filter' : '' }
              `}
              key={name}
              onClick={() => {
                setFilter(slugify(name))

                let top

                if ($('html, body').scrollTop() > 0) {
                  $('html, body').scrollTop(0)
                }

                if (filtersOriginalTop === null) {
                  top = document.querySelector('.main-content-filters').getBoundingClientRect().top
                  setFiltersOriginalTop(top)
                }

                else {
                  top = filtersOriginalTop
                }

                if ($('html, body').scrollTop() !== top) {
                  $('html, body').scrollTop(top)
                }
              }}
            >
                {name}
            </div>
          )) }
        </div>
      )}
      <div className="main-content-items">
        {contentItems.map((contentItem, index) => (
          <MainContentBox
            action={launchDetailPopup}
            buttonText={buttonText}
            contentItem={contentItem}
            index={index}
            key={contentItem.id}
          >
            { children(contentItem) }
          </MainContentBox>
        ))}
      </div>
      { infoPopupText && (
        <PopupContainer
          id="sound-library-info"
          // @ts-ignore
          closeIcon={CloseButton}
        >
          <Scrollbars>
            <h2>{ infoPopupTitle }</h2>
            <div dangerouslySetInnerHTML={{__html: infoPopupText}} />
          </Scrollbars>
        </PopupContainer>
      )}
    </div>
  )
}

export default MainContentList
