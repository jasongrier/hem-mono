import React, { ReactElement, SyntheticEvent, useEffect, useCallback, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { find, isFinite, isNaN, noop, findIndex, last, compact, isEmpty } from 'lodash'
import $ from 'jquery'
import marked from 'marked'
import Mustache from 'mustache'
import uuid from 'uuid/v1'
import Scrollbars from 'react-scrollbars-custom'
import ReactGA from 'react-ga'
import { closePopup, openPopup } from '../../../../../../lib/modules/popups'
import { TrackPlayPauseButton, ITrack, replacePlaylist, setPlayerPlaylist, IPlaylist } from '../../../../../../lib/modules/website-player'
import { addProductToCart, submitSale } from '../../cart'
import { getCookieName, SplitTests } from '../../app'
import { IContentItem, getContentItemsFromRawList, getContentItemById } from '../index'
import { assetHostHostname } from '../../../../functions'
import { BvgWatermark } from '../../../../components/berlin-stock-photos'
import ContentComponents from '../../../../components/content'
import { RootState } from '../../../../index'
import { BERLIN_STOCK_PHOTOS, MINIMUM_PRICE_FOR_RAW } from '../../../../config'
import { hasTag, contentItemToTrack, hasCategory, tagSpellingCorrections, parseText } from '../functions'
import { titleCase } from 'voca'

interface IProps {
  contentItem: IContentItem | null
  filter: string
  category: string

  showPurchaseForm?: boolean
  showMegaBlurb?: boolean
}

function DetailPopUp({
  contentItem,
  filter,
  category,

  showPurchaseForm = true,
  showMegaBlurb = true,
}: IProps): ReactElement {
  if (!contentItem) return <div />

  const {
    allContentItems,
    cartProducts,
    currentContentItems,
    currentProject,
    currentTrackId,
    playing,
    pricingMode,
  } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    cartProducts: state.cart.products,
    currentContentItems: state.content.currentContentItems,
    currentProject: state.content.currentProject,
    currentTrackId: state.player.currentTrack?.id,
    playing: state.player.playing,
    pricingMode: state.app.pricingMode,
  }))

  const dispatch = useDispatch()

  let initialPrice

  if (contentItem.hasFixedPrice) {
    initialPrice = contentItem.fixedPrice
  }

  else if (!BERLIN_STOCK_PHOTOS && contentItem.flexPriceRecommended) {
    initialPrice = contentItem.flexPriceRecommended
  }

  else if (!BERLIN_STOCK_PHOTOS) {
    initialPrice = '0'
  }

  else {
    initialPrice = '0'
  }

  const [attachedPlaylist, setAttachedPlaylist] = useState<Partial<IPlaylist>>()
  const [suggestedPrice, setSuggestedPrice] = useState<string>(initialPrice)
  const [valid, setValid] = useState<boolean>(true /* !!contentItem.fixedPrice */)
  const [saleId, setSaleId] = useState<string>()
  const [previousItem, setPreviousItem] = useState<IContentItem>()
  const [nextItem, setNextItem] = useState<IContentItem>()
  const [arrowKeysInited, setArrowKeysInited] = useState<boolean>(false)

  useEffect(function init() {
    if (showPurchaseForm) {
      ReactGA.modalview('Detail Popup with Purchase Form: ' + contentItem.title)
    }

    else {
      ReactGA.modalview('Detail Popup without Purchase Form: ' + contentItem.title)
    }

    setSaleId(uuid())

    setTimeout(() => {
      let attachedTracks: ITrack[] = []

      if (hasCategory(contentItem, 'tracks')) {
        attachedTracks = [contentItemToTrack(contentItem)]
      }

      else if (
        hasCategory(contentItem, 'label')
        || hasCategory(contentItem, 'press-releases')
        || hasCategory(contentItem, 'articles')
      ) {
        const attachedPlaylistItem = getContentItemById(allContentItems, contentItem.attachments)

        if (attachedPlaylistItem) {
          attachedTracks = compact(getContentItemsFromRawList(allContentItems, attachedPlaylistItem.attachments).map(item =>
            contentItemToTrack(item)
          ))
        }
      }

      else {
        attachedTracks = compact(getContentItemsFromRawList(allContentItems, contentItem.attachments).map(item =>
          contentItemToTrack(item)
        ))
      }

      const playlist = {
        name: 'On this page',
        tracks: attachedTracks,
      }

      dispatch(replacePlaylist(5, playlist))
      dispatch(setPlayerPlaylist(5))

      setAttachedPlaylist(playlist)
    })
  }, [contentItem.slug])

  const suggestedPriceOnChange = useCallback(
    function suggestedPriceOnChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      console.log(evt.currentTarget.value)
      const price = evt.currentTarget.value
      validate(price)
      setSuggestedPrice(price)
    }, [],
  )

  const suggestedPriceOnBlur = useCallback(
    function suggestedPriceOnBlurFn(evt: SyntheticEvent<HTMLInputElement>) {
      setSuggestedPrice(correctPrice(suggestedPrice))
    }, [suggestedPrice],
  )

  const history = useHistory()
  const { pathname } = useLocation()

  useEffect(function initArrowNavigation() {
    function bodyOnKeyDown(evt: any) {
      const $previousItemLink = $(BERLIN_STOCK_PHOTOS ?  '.bsp-lightbox-prev' : '.detail-popup-sibling-selector-prev a')
      const $nextItemLink = $(BERLIN_STOCK_PHOTOS ?  '.bsp-lightbox-next' : '.detail-popup-sibling-selector-next a')

      if (evt.keyCode === 37) {
        $previousItemLink.trigger('click')
      }

      if (evt.keyCode === 39) {
        $nextItemLink.trigger('click')
      }
    }

    function stopPropagationOnFormElements(evt: any) {
      evt.stopPropagation()
    }

    if (!arrowKeysInited) {
      $('body').on('keydown', bodyOnKeyDown)
      $('input, textarea, select').on('keydown', stopPropagationOnFormElements)
      setArrowKeysInited(true)
    }

    return function cleanup() {
      $('body').off('keyup', bodyOnKeyDown)
      $('body').off('keydown', stopPropagationOnFormElements)
    }
  }, [arrowKeysInited])

  useEffect(function setNextPreviousItems() {
    if (!currentContentItems) return
    if (!currentContentItems.length) return
    if (!contentItem) return

    const itemIndex = findIndex(currentContentItems, { id: contentItem.id })

    setPreviousItem(currentContentItems[itemIndex - 1])
    setNextItem(currentContentItems[itemIndex + 1])
  }, [currentContentItems, contentItem, nextItem, previousItem])

  useEffect(function resetValidityOnPrevNext() {
    setValid(true)
  }, [contentItem])

  const checkOutOnClick = useCallback(
    function checkOutOnClickFn() {
      if (!validate(suggestedPrice, true)) return
      if (!isInCart(contentItem)) {
        // TODO: contentItemToCartProduct
        dispatch(addProductToCart({
          downloadFile: contentItem.downloadFile,
          finalPrice: suggestedPrice,
          isDigitalProduct: contentItem.isDigitalProduct,
          title: contentItem.title,
          slug: contentItem.slug,
          type: contentItem.type,
        }))
      }

      dispatch(closePopup())

      dispatch(openPopup('cart-popup', {
        redirecting: true ,
        returnUrl: `${category}/${contentItem.slug}`,
      }))

      history.push(`/${category}/cart/${filter ? filter : ''}`)

      setTimeout(() => {
        if (!saleId) return
        dispatch(submitSale(saleId))
      })

      ReactGA.event({
        category: 'User',
        action: 'Clicked "Instant Download" for: ' + contentItem.title,
      })
    }, [filter, suggestedPrice, category, saleId],
  )

  const addToCartOnClick = useCallback(
    function addToCartOnClickFn() {
      addToCart()
    }, [filter, suggestedPrice, category],
  )

  const formOnSubmit = useCallback(
    function formOnSubmitFn(evt: SyntheticEvent<HTMLFormElement>) {
      evt.preventDefault()
      addToCart()
    }, [filter, suggestedPrice, category],
  )

  const instantDownloadOnClick = useCallback(
    function instantDownloadOnClickFn() {
      if (!validate(suggestedPrice, true)) return
      if (!saleId) return

      dispatch(addProductToCart({
        downloadFile: contentItem.downloadFile,
        finalPrice: suggestedPrice,
        isDigitalProduct: contentItem.isDigitalProduct,
        title: contentItem.title,
        slug: contentItem.slug,
        type: contentItem.type,
      }))

      dispatch(submitSale(saleId))
      dispatch(openPopup('thank-you-popup', { saleId }))

      history.push('/thank-you?sid=' + saleId)

      ReactGA.event({
        category: 'User',
        action: 'Clicked "Download" in detail popup: ' + contentItem.title + ', ' + suggestedPrice,
      })
    }, [saleId, suggestedPrice],
  )

  function validate(price: any, showAlerts = false) {
    if (!contentItem) {
      if (showAlerts) {
        alert('An unknown error has occurred, please reload the page')
      }

      setValid(false)
      return false
    }

    if (isNaN(parseFloat(price))) {
      setValid(false)
      return false
    }

    if (
      !contentItem.hasFixedPrice
      && contentItem.flexPriceMinimum
      && parseFloat(price) < parseFloat(contentItem.flexPriceMinimum)
    ) {
      if (showAlerts) {
        alert(`Sorry, the minimum price is ${contentItem.flexPriceMinimum} €.`)
      }

      setValid(false)
      return false
    }

    setValid(true)
    return true
  }

  function isInCart(contentItem: IContentItem, showAlerts = false) {
    if (find(cartProducts, { slug: contentItem.slug })) {
      if (showAlerts) {
        alert('That item is already in your cart.')
      }
      return true
    }

    return false
  }

  function isPurchaseable(item: IContentItem) {
    if (
      hasCategory(item, 'sound-library')
      || hasCategory(item, 'merch')
      || hasCategory(item, 'venue-calendar')
      || hasCategory(item, 'stock-photos')
      || hasCategory(item, 'editions')
      || (hasCategory(item, 'label') && (item.isDigitalProduct || item.isPhysicalProduct))
    ) {
      return true
    }

    return false
  }

  function addToCart() {
    if (!contentItem) return
    if (!validate(suggestedPrice, true)) return
    if (isInCart(contentItem, true)) return

    dispatch(addProductToCart({
      downloadFile: contentItem.downloadFile,
      finalPrice: suggestedPrice,
      isDigitalProduct: contentItem.isDigitalProduct,
      title: contentItem.title,
      slug: contentItem.slug,
      type: contentItem.type,
    }))

    dispatch(closePopup())
    dispatch(openPopup('cart-popup', { returnUrl: `${category}/${filter ? filter : ''}` }))

    history.push(`/${category}/cart/${filter ? filter : ''}`)

    ReactGA.event({
      category: 'User',
      action: 'Clicked "Add to Cart" for: ' + contentItem.title,
    })
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

  const flexPricingType = Cookies.get(getCookieName(SplitTests.FlexPricingType, currentProject))

  const buyNowText = category === 'venue-calendar'
    ? 'Buy Ticket'
    : 'Download'

  const addToCartText = category === 'venue-calendar'
    ? 'Add to Cart'
    : 'Add to Cart'

  const chooseYourPriceText = category === 'venue-calendar'
    ? 'Choose your ticket price!'
    : ( BERLIN_STOCK_PHOTOS ? 'Name your price!' : flexPricingType === 'buttons' ? 'Choose your price:' : 'Set your price')

  if (!contentItem) return (<div />)

  const tags = (contentItem.tags || '').split(', ')
  const isPrint = pathname.includes('stock-photos-prints')
  const assetHost = assetHostHostname()

  return (
    <section
      className={`
        detail-popup
        ${showPurchaseForm ? '' : 'purchase-form-hidden'}
        ${contentItem.slug}
        with-photography
      `}
    >
      <Scrollbars
        noScroll={BERLIN_STOCK_PHOTOS}
        createContext={true}
        noScrollX={true}
      >
        <header>
          <div className="detail-popup-title">
            <h1>{ isPrint ? 'Print of Photo #' : BERLIN_STOCK_PHOTOS ? 'Photo #' : '' }{ contentItem.title }</h1>
            <h2 dangerouslySetInnerHTML={{ __html: contentItem.secondaryTitle }} />
            <div className="detail-popup-sibling-selectors">
              { previousItem && (
                <div className="detail-popup-sibling-selector detail-popup-sibling-selector-prev">
                  <Link to={`/${category}/${previousItem.slug}${filter ? '/' + filter : ''}`}>
                    &laquo; { previousItem.title }
                  </Link>
                </div>
              )}
              { nextItem && (
                <div className="detail-popup-sibling-selector detail-popup-sibling-selector-next">
                  <Link to={`/${category}/${nextItem.slug}${filter ? '/' + filter : ''}`}>
                    { nextItem.title } &raquo;
                  </Link>
                </div>
              )}
            </div>
          </div>
          { BERLIN_STOCK_PHOTOS && (
            <>
              <div className="bsp-lightbox-image">
                <div
                  className="img"
                  style={{ backgroundImage: `url(${assetHost}/berlin-stock-photos/content/images/jpg-web/${contentItem.keyArt})`}}
                />
                <div
                  className="bsp-lightbox-image-placeholder"
                  style={{ backgroundImage: `url(${assetHost}/berlin-stock-photos/content/images/jpg-placeholders/${contentItem.keyArt})`}}
                />
                { !isPrint && (
                  <BvgWatermark width={800} />
                )}
              </div>
              <div
                className="bsp-lightbox-tags"
                style={{
                  display: contentItem.isPhysicalProduct ? 'none' : 'block'
                }}
              >
                <strong>Tags: </strong>
                { tags.map(tag =>
                  <span key={tag}>
                    <Link to={`/stock-photos/filter/${tag}`}>
                      { tagSpellingCorrections(titleCase(tag.replace(/-/g, ' ').replace(/,/g, ', ')), true) }
                    </Link>
                    { tag === last(tags) ? '' : ',' }
                  </span>
                )}
              </div>
              <div className="bsp-lightbox-type">
                <strong>Info: </strong>
                { contentItem.type + (isPrint ? '' : ', Image download, 3008 x 2000 pixels')}
              </div>
              <div
                className="bsp-lightbox-caption"
                dangerouslySetInnerHTML={{ __html: marked(contentItem.blurb) }}
                style={{
                  display: contentItem.blurb ? 'block' : 'none'
                }}
              />
              <div
                className="bsp-lightbox-license"
                style={{
                  display: contentItem.isPhysicalProduct ? 'none' : 'block'
                }}
              >
                <Link to="/stock-photos-license">Read the License Agreement</Link>
              </div>
              <div className="bsp-lightbox-nav" hidden>
                { previousItem && !isPrint && (
                  <Link
                    className="bsp-lightbox-prev"
                    to={`/${category}/${previousItem.slug}/${filter ? filter : ''}`}
                  >
                    &laquo; Previous photo
                  </Link>
                )}
                { previousItem && nextItem && !isPrint && <>&nbsp;&nbsp;|&nbsp;&nbsp;</> }
                { nextItem && !isPrint && (
                  <Link
                    className="bsp-lightbox-next"
                    to={`/${category}/${nextItem.slug}/${filter ? filter : ''}`}
                  >
                    Next photo &raquo;
                  </Link>
                )}
              </div>
            </>
          )}
          { !BERLIN_STOCK_PHOTOS && (
            <div
              className="detail-popup-key-art-image"
              style={{
                backgroundImage: `url(${assetHost}/hem-rocks/content/images/key-art/${contentItem.keyArt})`
              }}
            />
          )}
          <div className="detail-popup-header-content">
            { isPurchaseable(contentItem) && (
              <div className="detail-popup-actions">
                <div className="detail-popup-form detail-popup-buttons">
                  { pricingMode === 2 && (
                    <button
                      className="action-button donation-pricing-scheme-button"
                      onClick={instantDownloadOnClick}
                    >
                      Free Download
                    </button>
                  )}
                </div>
                { pricingMode === 1 && isPurchaseable(contentItem) && (
                  <div className={`detail-popup-form flex-pricing-type-${flexPricingType}`}>
                    {contentItem.hasFixedPrice && (
                      <p className="detail-popup-fixed-price">{ contentItem.fixedPrice } €</p>
                    )}
                    {!contentItem.hasFixedPrice && (
                      <>
                        <label className="suggested-price-label">
                          <strong>{ contentItem.type }&nbsp;—&nbsp;{ contentItem.fileSize }</strong><br />
                          { chooseYourPriceText }
                        </label>
                        {/* <span className="detail-popup-currency-symbol">€</span> */}
                        <form onSubmit={formOnSubmit}>
                          {flexPricingType === 'input' && (
                            <input
                              autoComplete="off"
                              min={contentItem.flexPriceMinimum || 0}
                              name="suggested-price"
                              onBlur={suggestedPriceOnBlur}
                              onChange={suggestedPriceOnChange}
                              type="text"
                              value={suggestedPrice}
                            />
                          )}
                          {flexPricingType === 'buttons' && (
                            contentItem.flexPriceChoices.split('|').map(choice => (
                              <div
                                className={`
                                  radio-label
                                  ${choice === suggestedPrice ? 'radio-label-active' : ''}
                                `}
                                key={choice}
                                onClick={() => setSuggestedPrice(choice)}
                              >
                                { choice } €
                              </div>
                            ))
                          )}
                        </form>
                        {flexPricingType === 'input' && (
                          <small className={
                            isFinite(parseFloat(suggestedPrice))
                            && parseFloat(suggestedPrice) < parseFloat(contentItem.flexPriceMinimum)
                              ? 'invalid-minimum'
                              : ''
                          }>
                            Minimum price: { contentItem.flexPriceMinimum } €
                          </small>
                        )}
                        <br />
                        { BERLIN_STOCK_PHOTOS && flexPricingType === 'input' && (
                          <>
                            <small>
                              Recommended price: { contentItem.flexPriceRecommended } €
                            </small>
                            <br />
                            <small>
                              Minimum price for RAW: { MINIMUM_PRICE_FOR_RAW } €
                            </small>
                          </>
                        )}
                        {!valid && flexPricingType === 'input' && (
                          <div className="invalid-message">
                            Please enter a valid price.
                          </div>
                        )}
                      </>
                    )}
                    <div className={`
                      detail-popup-buttons clearfix
                      ${valid ? '' : 'invalid'}
                    `}>
                      { (parseFloat(suggestedPrice) > 0 || cartProducts.length > 0)
                          && cartProducts.filter(p => p.isDigitalProduct === false).length === 0
                          && contentItem.isDigitalProduct
                          && (
                            <button
                              className="action-button"
                              onClick={checkOutOnClick}
                            >
                              { buyNowText }
                            </button>
                      )}
                      { (parseFloat(suggestedPrice) > 0 || cartProducts.length > 0) && (
                        <button
                          className="action-button"
                          onClick={addToCartOnClick}
                        >
                          { addToCartText }
                        </button>
                      )}
                      { (parseInt(suggestedPrice) === 0 && cartProducts.length === 0) && (
                        <button
                          className="action-button"
                          onClick={instantDownloadOnClick}
                        >
                          Download
                        </button>
                      )}
                      { !contentItem.hasFixedPrice && isNaN(parseFloat(suggestedPrice)) && (
                        <div className="purchase-form-spinner">
                          <button
                            className="action-button"
                            onClick={instantDownloadOnClick}
                          >
                            Download
                          </button>
                        </div>
                      )}
                      { BERLIN_STOCK_PHOTOS && contentItem.physicalFormats.length > 0 && (
                        <div className="bsp-print-link">
                          <Link to={`/stock-photos-prints/${contentItem.physicalFormats}`}>
                            Want a print of this photo?
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                { showPurchaseForm && contentItem.acceptingDonations && (
                  <div>
                    <h4>Contributing to this project</h4>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>
        <div className="detail-popup-details">
          { showMegaBlurb && (
            <div
              className="mega-blurb"
              dangerouslySetInnerHTML={{
                __html: marked(contentItem.blurb),
              }}
            />
          )}
          { hasTag(contentItem, 'component-content') && (
            React.createElement(ContentComponents[contentItem.description])
          )}
          { !hasTag(contentItem, 'component-content') && (
            <div
              className="detail-cms-text"
              dangerouslySetInnerHTML={{
                __html: parseText(
                  contentItem.description,
                  {
                    assetHost,
                    siteTexts: allContentItems
                      .filter(i =>
                        hasCategory(i, 'site-texts')
                        || hasTag(i, 'embedded-essay')
                      )
                      .reduce(
                        (acc, i) => {
                          acc[i.slug] = parseText(i.description, { assetHost })
                          return acc
                        }, {},
                      )
                    ,
                  },
                )
              }}
            />
          )}
          <div className={`
            detail-popup-details-sidebar
            ${ isPurchaseable(contentItem) ? '' : 'detail-popup-details-sidebar-raised'}
          `}>
            { attachedPlaylist && attachedPlaylist.tracks && attachedPlaylist.tracks.length > 1 && (
              <div className="detail-popup-details-sidebar-section">
                <ul className="detail-popup-details-playlist">
                  { attachedPlaylist.tracks.map(track => (
                    <li
                      className={ playing && currentTrackId === track.id ? 'active' : ''}
                      key={track.id}
                    >
                      <TrackPlayPauseButton track={track} />
                      <span className="detail-popup-details-playlist-text">
                        { track.title }
                        { hasTag(contentItem, 'has-multiple-artists') ? ' — ' + track.attribution : '' }
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            { contentItem.aside && (
              <div
                className="detail-popup-details-sidebar-info"
                dangerouslySetInnerHTML={{
                  __html: marked(contentItem.aside),
                }}
              />
            )}
          </div>
        </div>
      </Scrollbars>
      {/* <div className="scroll-down-pointer">
        <ChevronButton onClick={noop} />
      </div> */}
    </section>
  )
}

export default DetailPopUp
