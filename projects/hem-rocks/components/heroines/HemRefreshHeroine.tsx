import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import marked from 'marked'
import { CloseButton } from '../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup, closePopup } from '../../../../lib/modules/popups'
import { assetHostHostname } from '../../functions'
import { IContentItem } from '../../modules/core/content'

interface  IProps {
  contentItem: IContentItem
}

function HemRefreshHeroine({ contentItem }: IProps): ReactElement {
  const assetHost = assetHostHostname()

  return (
    <div className="hem-refresh-heroine">
      <Link to="/home/detail/update-april-2021">
        <div
          className="hem-refresh-heroine-image"
          style={{
            backgroundImage: `url(${assetHost}/hem.rocks/site/heroines/hem-refresh-heroine-5.jpg)`,
          }}
        />
        <div className="hem-refresh-heroine-details">
          <div className="hem-refresh-heroine-text">
            { contentItem && (
              <>
                <h2>{ contentItem.title }</h2>
                <h5
                  dangerouslySetInnerHTML={{ __html: marked(contentItem.description) }}
                />
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HemRefreshHeroine
