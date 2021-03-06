import React, { ReactElement, SyntheticEvent, useEffect, useCallback, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { find, isFinite, isNaN, noop, findIndex, last, compact, isEmpty } from 'lodash'
import $ from 'jquery'
import marked from 'marked'
import uuid from 'uuid/v1'
import Scrollbars from 'react-scrollbars-custom'
import ReactGA from 'react-ga'
import { closePopup, openPopup } from '../../../../../../lib/modules/popups'
import { TrackPlayPauseButton, ITrack, replacePlaylist, setPlayerPlaylist, IPlaylist } from '../../../../../../lib/modules/website-player'
import { addProductToCart, submitSale } from '../../cart'
import { getCookieName, SplitTests, getReleasePhase } from '../../app'
import { IContentItem, getContentItemsFromList, getContentItemsFromRawList, getContentItemById, getProperties, ImageGallery, SiteText } from '../index'
import { assetHostHostname } from '../../../../functions'
import ContentComponents from '../../../../components/content'
import { RootState } from '../../../../index'
import { BERLIN_STOCK_PHOTOS, MINIMUM_PRICE_FOR_RAW } from '../../../../config'
import { hasTag, contentItemToTrack, hasCategory, tagSpellingCorrections, parseText, hasProperty } from '../functions'

interface IProps {
  contentItem: IContentItem | null
  filter: string
  category: string

  showPurchaseForm?: boolean
  showMegaBlurb?: boolean
}

function DetailPopup({
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
    chunkLog,
    currentContentItems,
    currentProject,
    currentTrackId,
    playing,
    pricingMode,
    playlists,
  } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    cartProducts: state.cart.products,
    chunkLog: state.content.chunkLog,
    currentContentItems: state.content.currentContentItems,
    currentProject: state.content.currentProject,
    currentTrackId: state.player.currentTrack?.id,
    playing: state.player.playing,
    playlists: state.player.playlists,
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
  const [pagePlaylistSet, setPagePlaylistSet] = useState<boolean>(false)
  const [selectedPlaylistSet, setSelectedPlaylistSet] = useState<boolean>(false)

  useEffect(function initSale() {
    if (showPurchaseForm) {
      ReactGA.modalview('Detail Popup with Purchase Form: ' + contentItem.title)
    }

    else {
      ReactGA.modalview('Detail Popup without Purchase Form: ' + contentItem.title)
    }

    setSaleId(uuid())
  }, [])

  useEffect(function setUpAttachedTracksPlaylist() {
    if (!currentProject) return

    const releasePhase = getReleasePhase(currentProject)

    let attachedTracks: ITrack[] = []

    if (hasCategory(contentItem, 'tracks')) {
      attachedTracks = [contentItemToTrack(contentItem)]
    }

    else if (
      hasCategory(contentItem, 'label')
      || hasCategory(contentItem, 'press-releases')
      || hasCategory(contentItem, 'articles')
      || hasCategory(contentItem, 'news')
      || hasCategory(contentItem, 'sound-library')
    ) {
      const attachedPlaylistItem = getContentItemById(allContentItems, contentItem.attachments)

      if (attachedPlaylistItem) {
        attachedTracks = compact(getContentItemsFromList(allContentItems, attachedPlaylistItem.slug, currentProject)
          .filter(item =>
            item.project === currentProject
            && item.published
            && parseInt(item.releasePhase, 10) <= releasePhase
          )
          .map(item =>
            contentItemToTrack(item)
          ))
      }
    }

    else {
      attachedTracks = compact(getContentItemsFromList(allContentItems, contentItem.slug, currentProject)
        .filter(item => item.project === currentProject)
        .map(item =>
          contentItemToTrack(item)
        ))
    }

    const playlist: Partial<IPlaylist> = {
      name: 'Selected playlist',
      tracks: attachedTracks,
    }

    setAttachedPlaylist(playlist)

    const selectedPlaylistIndex = findIndex(playlists, { name: 'Selected playlist' })

    if (selectedPlaylistIndex > -1 && !selectedPlaylistSet) {
      playlist.displayName = contentItem.title
      dispatch(replacePlaylist(selectedPlaylistIndex, playlist))
      dispatch(setPlayerPlaylist(selectedPlaylistIndex))
      setSelectedPlaylistSet(true)
    }
  }, [contentItem.slug, chunkLog, currentProject, playlists])

  const suggestedPriceOnChange = useCallback(
    function suggestedPriceOnChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
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
  }, [currentContentItems, contentItem])

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
        alert(`Sorry, the minimum price is ${contentItem.flexPriceMinimum} ???.`)
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

  if (!currentProject) return <div />

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
        ${showPurchaseForm ? '' : 'detail-popup-purchase-form-hidden'}
        detail-popup-for-item-${contentItem.slug}
        detail-popup-with-filter-${filter}
        ${ getProperties(contentItem)
            .map(p => 'detail-popup-with-property-' + p)
            .join(' ')
          }
        ${filter}
      `}
    >
      <Scrollbars
        noScroll={hasCategory(contentItem, 'images')}
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
                  <Link to={`/${category}/detail/${previousItem.slug}${filter ? '/' + filter : ''}`}>
                    &laquo; { previousItem.title }
                  </Link>
                </div>
              )}
              { nextItem && (
                <div className="detail-popup-sibling-selector detail-popup-sibling-selector-next">
                  <Link to={`/${category}/detail/${nextItem.slug}${filter ? '/' + filter : ''}`}>
                    { nextItem.title } &raquo;
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div
            className="detail-popup-key-art-image"
            style={{
              backgroundImage: (
                contentItem.keyArtFullPath
                  ? `url(${assetHost}/${currentProject}/${contentItem.keyArtFullPath})`
                  : `url(${assetHost}/${currentProject}/content/images/key-art/${contentItem.keyArt})`
              ),
            }}
          />
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
                      <p className="detail-popup-fixed-price">{ contentItem.fixedPrice } ???</p>
                    )}
                    {!contentItem.hasFixedPrice && (
                      <>
                        <label className="suggested-price-label">
                          <strong>{ contentItem.type }&nbsp;???&nbsp;{ contentItem.fileSize }</strong><br />
                          { chooseYourPriceText }
                        </label>
                        {/* <span className="detail-popup-currency-symbol">???</span> */}
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
                                { choice } ???
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
                            Minimum price: { contentItem.flexPriceMinimum } ???
                          </small>
                        )}
                        <br />
                        { BERLIN_STOCK_PHOTOS && flexPricingType === 'input' && (
                          <>
                            <small>
                              Recommended price: { contentItem.flexPriceRecommended } ???
                            </small>
                            <br />
                            <small>
                              Minimum price for RAW: { MINIMUM_PRICE_FOR_RAW } ???
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
          { hasProperty(contentItem, 'component-content') && (
            React.createElement(ContentComponents[contentItem.description])
          )}
          { !hasProperty(contentItem, 'component-content') && (
            <SiteText
              textItemId={contentItem.id}
              render={{ imageGallery: (galleryId: string) => (
                <ImageGallery galleryId={galleryId} />
              )}}
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
                        { hasProperty(contentItem, 'has-multiple-artists') ? ' ??? ' + track.attribution : '' }
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            { contentItem.aside && (
              <SiteText
                textItemId={contentItem.id}
                textItemField="aside"
                render={{ imageGallery: (galleryId: string) => (
                  <ImageGallery galleryId={galleryId} />
                )}}
              />
            )}
          </div>
        </div>
      </Scrollbars>
    </section>
  )
}

export default DetailPopup
