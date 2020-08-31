import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import Scrollbars from 'react-scrollbars-custom'
import moment from 'moment'
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
  const { currentSale, saleRetrievalError, forcedSaleId } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
    currentSale: state.cart.currentSale,
    saleRetrievalError: state.cart.saleRetrievalError,
    
    forcedSaleId: state.popups.propsToChildren?.saleId,
  }))

  const dispatch = useDispatch()

  const [alreadyDownloaded, setAlreadyDownloaded] = useState<boolean>()
  const [linksUsed, setLinksUsed] = useState<string[]>([])

  useEffect(function init() {
    const saleId = forcedSaleId || getQueryVar('sid')
    
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

  const valid = forcedSaleId || getQueryVar('sid')
  const products = currentSale?.products
  const loading = !currentSale || !products

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
            { loading && (
              <p>Locating your order...</p>
            )}
            <p className="order-heading">Here is your order summary</p>
            <div className="download-items">
              <Scrollbars noScrollX={true}>
                { loading && (
                  <Spinner />
                )}
                { products && products.length > 0 && products.map((product, index) => (
                  <li key={product?.slug}>
                    { product.isDigitalProduct && (
                      <a 
                        className={linksUsed.includes(product?.slug) ? 'download-items-used-link' : ''}
                        href={`${assetHostHostname()}/hem-rocks/api?hem-cmd=download&did=${currentSale?.id}:${index}&sid=${currentSale?.id}&ii=${index}${BERLIN_STOCK_PHOTOS ? '&site=bsp' : ''}`}
                        onClick={() => {
                          setLinksUsed(([] as string[]).concat(linksUsed).concat([product?.slug]))
                        }}
                      >
                        { BERLIN_STOCK_PHOTOS ? 'Photo' : ' '} #{ product?.title } ({ BERLIN_STOCK_PHOTOS ? 'JPEG' : ' '})
                      </a>
                    )}
                    { product.isDigitalProduct && BERLIN_STOCK_PHOTOS && parseFloat(product.finalPrice) >= 20 && (
                      <>
                        &nbsp;|&nbsp;
                        <a 
                          className={linksUsed.includes(product?.slug) ? 'download-items-used-link' : ''}
                          href={`${assetHostHostname()}/hem-rocks/api?hem-cmd=download&did=${currentSale?.id}:${index}-raw&sid=${currentSale?.id}&ii=${index}${BERLIN_STOCK_PHOTOS ? '&site=bsp&format=raw' : ''}`}
                          onClick={() => {
                            setLinksUsed(([] as string[]).concat(linksUsed).concat([product?.slug]))
                          }}
                        >
                          Photo #{ product?.title } (RAW)
                        </a>
                      </>
                    )}
                    
                    { product.isDigitalProduct && (
                      <><br /><small>Click the link(s) above to download</small></>
                    )}
                    
                    { !product.isDigitalProduct && (
                      <span>
                        { BERLIN_STOCK_PHOTOS ? 'Photo' : ' '} 
                        #{ product?.title } &mdash; { product?.type } 
                        <br />
                        <small>(Ships on { moment().add(2, 'days').endOf('day').format('DD.MM.YYYY') })</small>
                      </span>
                    )}
                  </li>
                ))}
              </Scrollbars>
              <div className="support-link">
                <a href="/stock-photos-license" target="_blank">License Agreement</a><br />
                <a href="/support" target="_blank">Problems with your order?</a>
              </div>
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
