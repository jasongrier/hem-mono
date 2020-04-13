import React, { ReactElement, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Scrollbars from 'react-scrollbars-custom'
import { slugify } from 'voca'
import moment from 'moment'
import { CloseButton } from '../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../lib/modules/popups'
import { MainContentBox } from './index'
import { setCurrentContentItem, IContentItem } from '../modules/content'
import { CampaignMonitorForm } from '../../../lib/components'
import { RootState } from '../index'

interface IProps {
  blurb: string
  buttonText: string
  children: (contentItem: IContentItem) => any
  infoPopupTitle: string
  tag: string
  title: string

  campaignMonitorId?: string
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
  filters,
  highlights,
  infoPopupText,
}: IProps): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const [filter, setFilter] = useState('all')

  filters = ['All'].concat(filters)

  let contentItems = allContentItems.filter(item =>
    item.tags.includes(tag) && item.published && !item.sticky
  )

  let stickyContentItems = allContentItems.filter(
    item => item.tags.includes(tag) && item.published && item.sticky
  )

  if (filter !== 'all') {
    contentItems = contentItems.filter(item => item.tags.includes(filter))
    stickyContentItems = stickyContentItems.filter(item => item.tags.includes(filter))
  }

  function sortFn(a, b) {
    // @ts-ignore
    return moment(b.date, 'DD-MM-YYYY') - moment(a.date, 'DD-MM-YYYY')
  }

  contentItems.sort(sortFn)
  stickyContentItems.sort(sortFn)

  contentItems = stickyContentItems.concat(contentItems)

  function launchDetailPopup(pack) {
    dispatch(setCurrentContentItem(pack))
    dispatch(openPopup('detail-popup'))
  }

  return (
    <header className="main-content-list">
      <h1 className={ !blurb ? 'no-blurb' : '' }>
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
      <div
        className={`
          main-content-blurb
          ${highlights ? 'has-highlights' : ''}
        `}
        dangerouslySetInnerHTML={{__html: blurb}}
      />
      <div className="main-content-highlights clearfix">
        {highlights && (
          highlights.map(highlight => (
            <div
              className="main-content-highlight"
              dangerouslySetInnerHTML={{__html: '– ' + highlight}}
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
      {filters && (
        <div className="main-content-filters clearfix">
          <h3>Filter</h3>
          { filters.map(name => (
            <div
              className={`
                main-content-filter
                ${ filter === slugify(name) ? 'active' : '' }
              `}
              key={name}
              onClick={() => setFilter(slugify(name))}
            >
                {name}
            </div>
          )) }
        </div>
      )}
      {contentItems.map(contentItem => (
        <MainContentBox
          action={launchDetailPopup}
          buttonText={buttonText}
          key={contentItem.id}
          contentItem={contentItem}
        >
          { children(contentItem) }
        </MainContentBox>
      ))}
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
    </header>
  )
}

export default MainContentList
