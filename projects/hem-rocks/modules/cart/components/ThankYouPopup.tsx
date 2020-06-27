import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import Scrollbars from 'react-scrollbars-custom'
import uuid from 'uuid/v1'
import { getQueryVar } from '../../../../../lib/functions'
import { EmailForm } from '../../app'
import { assetHostHostname } from '../../../functions'
import { RootState } from '../../../index'
import { closePopup } from '../../../../../lib/modules/popups'
import { clearCart, requestSale, IProduct } from '../index'

function ThankYouPopup(): ReactElement {
  const { contentItems, currentSale } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
    currentSale: state.cart.currentSale,
  }))

  const dispatch = useDispatch()

  const [alreadyDownloaded, setAlreadyDownloaded] = useState<boolean>()

  useEffect(function init() {
    dispatch(clearCart())
    dispatch(requestSale(getQueryVar('sid')))

    if (getQueryVar('ad') === 'true') {
      setAlreadyDownloaded(true)
    }
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

  const valid = getQueryVar('sid')
  const items = currentSale?.products.filter((product: IProduct) => product.isDigitalProduct)

  return (
    <div className="thank-you-popup">
      <header>
        <h1>
          { (valid && !alreadyDownloaded) ? 'Thank you!' : 'Hmmmmm...' }
        </h1>
      </header>
      <div className="thank-you-popup-content">
        { valid && !alreadyDownloaded && (
          <>
            <p>Here are links to your files. Click to download.</p>

            <div className="download-items">
              <Scrollbars noScrollX={true}>
                { items && items.map((item, index) => (
                  <li key={item?.slug}>
                    <a href={`${assetHostHostname()}/hem-rocks/api?hem-cmd=download&did=${currentSale.id}:${index}&sid=${currentSale.id}&ii=${index}`}>
                      { item?.title }
                    </a>
                  </li>
                ))}
              </Scrollbars>
              <Link
                className="support-link"
                to="/support"
              >
                Problems downloading?
              </Link>
            </div>

            <div className="thank-you-popup-email-form">
              <EmailForm onFormSubmitted={onFormSubmitted} />
            </div>
          </>
        )}
        { !valid && (
          <>
            <p>You've arrived at the "Thank you" page but it seems like you have not ordered anything.</p>
            <p><strong>If you're seeing this screen and you just completed an order or clicked a "Download" button, then please <Link to="/support">contact support right away</Link>.</strong></p>
            <p>If you didn't just complete an order or click a "Download" button, then simply <Link to="/">go home</Link>.</p>
          </>
        )}
        { alreadyDownloaded && (
          <>
            <p>Sorry, it looks like that download link has already been used.</p>
            <p>Unfortunately we can't offer re-usable download links just yet.</p>
            <p>If you need to re-download something, <Link to="/support">just contact us</Link>.</p>
          </>
        )}
      </div>
    </div>
  )
}

export default ThankYouPopup
