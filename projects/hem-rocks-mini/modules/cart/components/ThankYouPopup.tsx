import React, { ReactElement, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ReactGA from 'react-ga'
import Scrollbars from 'react-scrollbars-custom'
import { getQueryVar } from '../../../../../lib/functions'
import { EmailForm } from '../../app'
import { RootState } from '../../../index'
import { closePopup } from '../../../../../lib/modules/popups'
import { clearCart } from '../index'

interface IProps {
  itemSlugs: string[]
}

function ThankYouPopup({ itemSlugs }: IProps): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  useEffect(function init() {
    dispatch(clearCart())
  }, [])

  const history = useHistory()

  const onFormSubmitted = useCallback(
    function onFormSubmittedFn() {
      ReactGA.event({
        category: 'User',
        action: 'Signed up for mailing list after purchase',
      })
    }, [],
  )

  const goHomeOnClick = useCallback(
    function goHomeOnClickFn() {
      history.push('/')
      dispatch(closePopup())
    }, [],
  )

  if (!itemSlugs) {
    const queryItems = getQueryVar('items')

    if (queryItems) {
      itemSlugs = queryItems.split(',')
    }
  }

  const items = itemSlugs && itemSlugs.map(slug => contentItems.find(item => item.slug === slug)).filter(Boolean)

  const valid = (
    itemSlugs
    && itemSlugs.length
    && items
    && items.length
    && items.length === itemSlugs.length
  )

  return (
    <div className="thank-you-popup">
      <header>
        <h1>
          { valid ? 'Thank you!' : 'Hmmmmm...' }
        </h1>
      </header>
      <div className="thank-you-popup-content">
        { valid && (
          <>
            <p>Here are links to your files. Right-click to download.</p>

            <div className="download-items">
              <Scrollbars noScrollX={true}>
                { items.map(item => (
                  <li key={item?.slug}>
                    <a href="#">{ item?.title }</a>
                  </li>
                ))}
              </Scrollbars>
            </div>

            <div className="thank-you-popup-email-form">
              <EmailForm onFormSubmitted={onFormSubmitted} />
            </div>
          </>
        )}
        { !valid && (
          <>
            <p>You've arrived at the "Thank you" page but it seems like you have not ordered anything.</p>
            <p><strong>If you're seeing this screen and you just completed an order or clicked a "Download" button, then please contact support right away at <a href="mailto:info@hem.rocks">info@hem.rocks</a> and we'll get it all sorted out.</strong></p>
            <p>If you didn't just complete an order or click a "Download" button, then simply <a href="#" onClick={goHomeOnClick}>go home</a>.</p>
          </>
        )}
      </div>
    </div>
  )
}

export default ThankYouPopup
