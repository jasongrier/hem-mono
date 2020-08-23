import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import Scrollbars from 'react-scrollbars-custom'
import uuid from 'uuid/v1'
import { getQueryVar } from '../../../../../lib/functions'
import { Spinner } from '../../../../../lib/components'
import { EmailForm } from '../../app'
import { assetHostHostname } from '../../../functions'
import { BERLIN_STOCK_PHOTOS } from '../../../config'
import { RootState } from '../../../index'
import { closePopup } from '../../../../../lib/modules/popups'
import { clearCart, requestSale, IProduct } from '../index'
import { loginCheckSaga } from '../../login'

function ThankYouPopup(): ReactElement {
  const { currentSale, saleRetrievalError } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
    currentSale: state.cart.currentSale,
    saleRetrievalError: state.cart.saleRetrievalError,
  }))

  const dispatch = useDispatch()

  const [alreadyDownloaded, setAlreadyDownloaded] = useState<boolean>()
  const [linksUsed, setLinksUsed] = useState<string[]>([])

  useEffect(function init() {
    const saleId = getQueryVar('sid')
    
    if (!saleId) return
    
    dispatch(clearCart())
    dispatch(requestSale(saleId))

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
        { valid && !alreadyDownloaded && !saleRetrievalError && (
          <>
            { !items && (
              <p>Locating your files...</p>
            )}
            { items && items.length > 0 && (
              <p>Here are links to your files. Click to download.</p>
            )}
            <div className="download-items">
              <Scrollbars noScrollX={true}>
                { !items && (
                  <Spinner />
                )}
                { items && items.length < 1 && (
                  <>
                    <p>That's odd, we can't find your downloads.</p>
                    <p>Please <Link to="/support">contact us</Link> right away and we'll get this sorted!</p>
                  </>
                )}
                { items && items.length > 0 && items.map((item, index) => (
                  <li key={item?.slug}>
                    <a 
                      className={linksUsed.includes(item?.slug) ? 'download-items-used-link' : ''}
                      href={`${assetHostHostname()}/hem-rocks/api?hem-cmd=download&did=${currentSale?.id}:${index}&sid=${currentSale?.id}&ii=${index}`}
                      onClick={() => {
                        setLinksUsed(([] as string[]).concat(linksUsed).concat([item?.slug]))
                      }}
                    >
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
        { saleRetrievalError && (
          <>
            <p>Sorry but we could not retrieve your items.</p>
            <p>Please <Link to="/support">contact support right away</Link>.</p>
          </>
        )}
        { alreadyDownloaded && (
          <>
            <p>Sorry, it looks like that download link has already been used.</p>
            <p>Unfortunately we can't offer re-usable download links just yet.</p>
            <p>If you need to re-download something, <Link to="/support">just contact us</Link>.</p>
            <p>
              <button 
                className="action-button"
                onClick={() => {}}
              >
                Back
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default ThankYouPopup
