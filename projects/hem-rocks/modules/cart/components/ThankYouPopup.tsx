import React, { ReactElement, useCallback, useEffect, useState, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import uuid from 'uuid/v1'
import Scrollbars from 'react-scrollbars-custom'
import moment from 'moment'
import { getQueryVar } from '../../../../../lib/functions'
import { Spinner } from '../../../../../lib/components'
import { EmailForm } from '../../app'
import { assetHostHostname } from '../../../functions'
import { BERLIN_STOCK_PHOTOS } from '../../../config'
import { RootState } from '../../../index'
import { closePopup, openPopup } from '../../../../../lib/modules/popups'
import { clearCart, requestSale, IProduct, addProductToCart, submitSale } from '../index'
import { MINIMUM_PRICE_FOR_RAW } from '../../../config'

function ThankYouPopup(): ReactElement {
  const { currentSale, saleRetrievalError, forcedSaleId, pricingMode } = useSelector((state: RootState) => ({
    pricingMode: state.app.pricingMode,
    
    contentItems: state.content.contentItems,
    currentSale: state.cart.currentSale,
    saleRetrievalError: state.cart.saleRetrievalError,
    
    forcedSaleId: state.popups.propsToChildren?.saleId,
  }))

  const dispatch = useDispatch()

  const [alreadyDownloaded, setAlreadyDownloaded] = useState<boolean>()
  const [linksUsed, setLinksUsed] = useState<string[]>([])
  const [donationAmount, setDonationAmount] = useState<string>('10')
  const [donationAmountValid, setDonationAmountValid] = useState<boolean>(true)

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

  const onDontationChange = useCallback(
    function onDontationChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      const price = evt.currentTarget.value
      validate(price)
      setDonationAmount(price)
    }, [],
  )

  const onDonateFormSubmit = useCallback(
    function onDonateFormSubmitFn(evt: SyntheticEvent<HTMLFormElement>) {
      evt.preventDefault()
    }, [],
  )

  const onDontationBlur = useCallback(
    function onDontationBlurFn(evt: SyntheticEvent<HTMLInputElement>) {
      setDonationAmount(correctPrice(donationAmount))
    }, [donationAmount],
  )

  const onDonateClick = useCallback(
    function onDonateClickFn() {
      if (!validate(donationAmount, true)) return
      dispatch(addProductToCart({
        downloadFile: '',
        finalPrice: donationAmount,
        isDigitalProduct: false,
        title: 'Donation',
        slug: 'donation',
        type: 'Donation',
      }))

      dispatch(closePopup())

      dispatch(openPopup('cart-popup', {
        redirecting: true,
        returnUrl: `/`,
      }))

      setTimeout(() => {
        dispatch(submitSale(uuid()))
      })

      ReactGA.event({
        category: 'User',
        action: 'Donated: ' + donationAmount,
      })
    }, [donationAmount],
  )

  function validate(price: any, showAlerts = false) {
    if (isNaN(parseFloat(price))) {
      setDonationAmountValid(false)
      return false
    }
    setDonationAmountValid(true)
    return true
  }

  function correctPrice(price: string) {
    const chars = price.split('')

    if (isNaN(parseInt(chars[0], 10))) return price

    let correctedPrice = ''
    let decimalPlace = 0
    for (const char of chars) {
      if (char === ',') {
        if (decimalPlace > 0) {
          break
        }
        correctedPrice = correctedPrice + '.'
        decimalPlace ++
        continue
      }

      if (char === '.') {
        if (decimalPlace > 0) {
          break
        }
        correctedPrice = correctedPrice + char
        decimalPlace ++
        continue
      }

      if (isNaN(parseInt(char))) {
        break
      }

      if (decimalPlace > 2) {
        break
      }

      if (decimalPlace > 0) {
        decimalPlace ++
      }

      correctedPrice = correctedPrice + char
    }

    correctedPrice = correctedPrice.replace(/\.$/, '')

    const correctedPriceSplit = correctedPrice.split('.')

    if (
      correctedPriceSplit.length > 0
      && parseInt(correctedPriceSplit[1], 10) === 0
    ) {
      correctedPrice = correctedPriceSplit[0]
    }

    return correctedPrice
  }

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
                    { product.isDigitalProduct && BERLIN_STOCK_PHOTOS && parseFloat(product.finalPrice) >= MINIMUM_PRICE_FOR_RAW && (
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
                    
                    { !product.isDigitalProduct && product?.type !== 'Donation' && (
                      <span>
                        { BERLIN_STOCK_PHOTOS ? 'Photo' : ' '} 
                        #{ product?.title } &mdash; { product?.type } 
                        <br />
                        <small>(Ships on { moment().add(2, 'days').endOf('day').format('DD.MM.YYYY') })</small>
                      </span>
                    )}
                    
                    { product?.type === 'Donation' && (
                      <span>
                        { product?.title } &mdash; Thank you!
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
            
            { pricingMode === 1 && (
              <div className="thank-you-popup-email-form">
                <EmailForm onFormSubmitted={onFormSubmitted} />
              </div>
            )}
            { pricingMode === 2 && products && products.length > 0 && products.filter(p => p.type === 'Donation').length === 0 && (
              <div className="thank-you-popup-donate-form">
                <>
                  <h2>While you're here,<br />why not consider making a donation?</h2>
                  <span className="detail-popup-currency-symbol">€</span>
                  <form onSubmit={onDonateFormSubmit}>
                    <input
                      autoComplete="off"
                      name="suggested-price"
                      onBlur={onDontationBlur}
                      onChange={onDontationChange}
                      type="text"
                      value={donationAmount}
                    />
                  </form>
                  {!donationAmountValid && (
                    <div className="invalid-message">
                      Please enter a valid price.
                    </div>
                  )}
                  <button
                    className={`
                      action-button
                      ${valid ? '' : 'invalid'}
                    `}
                    onClick={onDonateClick}
                  >
                    SEND { donationAmount } €!
                  </button>
                </>
              </div>
            )}
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
