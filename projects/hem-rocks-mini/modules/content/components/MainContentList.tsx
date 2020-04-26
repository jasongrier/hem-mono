import React, { ReactElement, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useLocation } from 'react-router-dom'
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
import { LISTS_HAVE_BLURBS } from '../../../config'

interface IProps {
  blurb: string
  children: (contentItem: IContentItem) => any
  tag: string
  title: string

  buttonText?: string
  campaignMonitorId?: string
  exclusiveFilters?: string[]
  currentFilter?: string,
  filters?: string[]
  highlights?: string[]
  onFiltersChanged?: () => void

  // TODO: Deprecated; remove info popup
  infoPopupText?: string
  infoPopupTitle?: string
}

function MainContentList({
  blurb,
  children,
  tag,
  title,

  buttonText,
  campaignMonitorId,
  exclusiveFilters = [],
  currentFilter = 'all',
  filters = [],
  highlights,
  infoPopupText,
  infoPopupTitle,
  onFiltersChanged,
}: IProps): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const [filtersOriginalTop, setFiltersOriginalTop] = useState(null as number | null)

  filters = compact(['All'].concat(exclusiveFilters).concat(filters))

  let contentItems = allContentItems.filter(item =>
    item.tags.includes(tag) && item.published && !item.sticky
  )

  let stickyContentItems = allContentItems.filter(
    item => item.tags.includes(tag) && item.published && item.sticky
  )

  if (currentFilter && currentFilter !== 'all') {
    contentItems = contentItems.filter(item => item.tags.includes(currentFilter))
    stickyContentItems = stickyContentItems.filter(item => item.tags.includes(currentFilter))
  }

  else {
    contentItems = contentItems.filter(item =>
      intersectionBy(item.tags, exclusiveFilters.map(slugify)).length === 0
    )
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
      { LISTS_HAVE_BLURBS && (
        <div className="main-content-blurb"
          dangerouslySetInnerHTML={{__html: blurb}}
        />
      )}
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
          <h3>Select:</h3>
          { filters.map(name => (
            <Link
              className={`
                main-content-filter
                ${ currentFilter === slugify(name) ? 'active' : '' }
                ${ exclusiveFilters.includes(name) ? 'exclusive-filter' : '' }
              `}
              key={name}
              to={`/${tag}/${name !== 'All' ? slugify(name) : ''}`}
              onClick={() => {
                onFiltersChanged && onFiltersChanged()

                let top

                // @ts-ignore
                if ($('html, body').scrollTop() > 0) {
                  $('html, body').scrollTop(0)
                }

                if (filtersOriginalTop === null) {
                  // @ts-ignore
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
            </Link>
          ))}
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
