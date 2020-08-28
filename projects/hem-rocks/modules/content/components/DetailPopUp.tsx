import React, { ReactElement, SyntheticEvent, useEffect, useCallback, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { find, isFinite, isNaN, noop, findIndex, last } from 'lodash'
import $ from 'jquery'
import marked from 'marked'
import uuid from 'uuid/v1'
import Scrollbars from 'react-scrollbars-custom'
import ReactGA from 'react-ga'
import { Spinner } from '../../../../../lib/components'
import { PlayPauseButton, ChevronButton } from '../../../../../lib/packages/hem-buttons'
import { closePopup, openPopup } from '../../../../../lib/modules/popups'
import { TrackPlayPauseButton, ITrack, replacePlaylist, setPlayerPlaylist, IPlaylist } from '../../../../../lib/modules/website-player'
import { addProductToCart, submitSale } from '../../cart'
import { IContentItem, getContentItemsFromRawList } from '../index'
import { assetHostHostname } from '../../../functions'
import { RootState } from '../../../index'
import { BERLIN_STOCK_PHOTOS } from '../../../config'
import { hasTag, contentItemToTrack, hasCategory, tagSpellingCorrections } from '../functions'
import { titleCase } from 'voca'

interface IProps {
  contentItem: IContentItem | null
  currentContentItems: IContentItem[]
  filter: string
  category: string

  showPurchaseForm?: boolean
}

function DetailPopUp({
  contentItem,
  filter,
  category,

  showPurchaseForm = true,
}: IProps): ReactElement {
  if (!contentItem) return <div />

  const { 
    activeLiveStream, 
    
    allContentItems, 
    currentContentItems,

    cartProducts, 
    
    currentTrackId, 
    playing,
  } = useSelector((state: RootState) => ({
    activeLiveStream: state.app.activeLiveStream,
    
    allContentItems: state.content.contentItems,
    currentContentItems: state.content.currentContentItems,
    
    cartProducts: state.cart.products,
    
    currentTrackId: state.player.currentTrack?.id,
    playing: state.player.playing,
  }))

  const dispatch = useDispatch()

  const [attachedPlaylist, setAttachedPlaylist] = useState<Partial<IPlaylist>>()
  const [suggestedPrice, setSuggestedPrice] = useState<string>((contentItem ? contentItem.flexPriceRecommended : '0'))
  const [valid, setValid] = useState<boolean>(true)
  const [saleId, setSaleId] = useState<string>()
  const [previousItem, setPreviousItem] = useState<IContentItem>()
  const [nextItem, setNextItem] = useState<IContentItem>()
  const [keyListenerAdded, setKeyListenerAdded] = useState<boolean>(false)

  useEffect(function init() {
    if (showPurchaseForm) {
      ReactGA.modalview('Detail Popup with Purchase Form: ' + contentItem.title)
    }

    else {
      ReactGA.modalview('Detail Popup without Purchase Form: ' + contentItem.title)
    }

    setSaleId(uuid())

    setTimeout(() => {
      let attachedTracks

      if (hasCategory(contentItem, 'tracks')) {
        attachedTracks = [contentItemToTrack(contentItem)]
      }

      else {
        attachedTracks = getContentItemsFromRawList(allContentItems, contentItem.trackSlugs).map(track =>
          contentItemToTrack(track)
        )
      }

      const playlist = {
        name: 'Current Page',
        tracks: attachedTracks,
      }

      dispatch(replacePlaylist(1, playlist))
      dispatch(setPlayerPlaylist(1))

      setAttachedPlaylist(playlist)
      setSuggestedPrice(contentItem.flexPriceRecommended)
    })
  }, [contentItem.slug])

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

  useEffect(function initArrowNavigation() {
    function bodyOnKeyDown(evt: any) {
      const previousItemLink = $('.bsp-lightbox-prev')
      const nextItemLink = $('.bsp-lightbox-next')

      if (evt.keyCode === 37 && previousItemLink.length) {
        // @ts-ignore
        history.push(`/${category}/${previousItemLink.attr('href').split('/')[2]}/${filter ? filter : ''}`)
      }
      
      if (evt.keyCode === 39 && nextItemLink.length) {
        // @ts-ignore
        history.push(`/${category}/${nextItemLink.attr('href').split('/')[2]}/${filter ? filter : ''}`)
      }
    }

    function stopPropagationOnFormElements(evt: any) {
      evt.stopPropagation()
    }
    
    $('body').on('keydown', bodyOnKeyDown)
    $('input, textarea, select').on('keydown', stopPropagationOnFormElements)

    return function cleanup() {
      $('body').off('keyup', bodyOnKeyDown)
      $('body').off('keydown', stopPropagationOnFormElements)
    }
  }, [])
  
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

      history.push('/thank-you')

      ReactGA.event({
        category: 'User',
        action: 'Clicked "Download" in detail popup',
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

  const assetHost = assetHostHostname()

  const buyNowText = category === 'venue-calendar'
    ? 'Buy Ticket'
    : 'Check out'

  const addToCartText = category === 'venue-calendar'
    ? 'Add to Cart'
    : 'Add to Cart'

  const chooseYourPriceText = category === 'venue-calendar'
    ? 'Choose your ticket price!'
    : ( BERLIN_STOCK_PHOTOS ? 'Name your price!' : 'Choose your price!')
  
    
  if (!contentItem) return (<div />)

  const tags = (contentItem.tags || '').split(', ')
  
  return (
    <section
      className={`
        detail-popup
        ${showPurchaseForm ? '' : 'purchase-form-hidden'}
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
            <h1>{ contentItem.title }</h1>
            <h2 dangerouslySetInnerHTML={{ __html: contentItem.secondaryTitle }} />
          </div>
          { BERLIN_STOCK_PHOTOS && (
            <>
              <div className="bsp-lightbox-image">
                <img 
                  src={`${assetHost}/berlin-stock-photos/content/images/jpg-web/${contentItem.keyArt}`}
                  alt={contentItem.secondaryTitle}
                />
              </div>
              <div className="bsp-lightbox-tags">
                { tags.map(tag =>
                  <span key={tag}>
                    <Link to={`/stock-photos/filter/${tag}`}>
                      { tagSpellingCorrections(titleCase(tag.replace(/-/g, ' ')), true) }
                    </Link>
                    { tag === last(tags) ? '' : ',' }
                  </span>
                )}
              </div>
              <div
                className="bsp-lightbox-caption"
                dangerouslySetInnerHTML={{ __html: marked(contentItem.blurb) }}
                />
              <div className="bsp-lightbox-nav">
                { previousItem && (
                  <Link 
                    className="bsp-lightbox-prev"
                    to={`/${category}/${previousItem.slug}/${filter ? filter : ''}`}
                  >
                    &laquo; Previous photo
                  </Link>
                )}
                &nbsp;&nbsp;|&nbsp;&nbsp;
                { nextItem && (
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
            <div className="detail-popup-actions">
              { isPurchaseable(contentItem) && (
                <div className="detail-popup-form">
                  {contentItem.hasFixedPrice && (
                    <p>{ contentItem.fixedPrice }</p>
                  )}
                  {!contentItem.hasFixedPrice && (
                    <>
                      <label
                        className="suggested-price"
                        htmlFor="suggested-price"
                      >
                        <em>{ chooseYourPriceText }</em><br />
                      </label>
                      <span className="detail-popup-currency-symbol">€</span>
                      <form onSubmit={formOnSubmit}>
                        <input
                          autoComplete="off"
                          min={contentItem.flexPriceMinimum || 0}
                          name="suggested-price"
                          onBlur={suggestedPriceOnBlur}
                          onChange={suggestedPriceOnChange}
                          type="text"
                          value={suggestedPrice}
                        />
                      </form>
                      <small className={
                        isFinite(parseFloat(suggestedPrice))
                        && parseFloat(suggestedPrice) < parseFloat(contentItem.flexPriceMinimum)
                          ? 'invalid-minimum'
                          : ''
                      }>
                        Minimum price: { contentItem.flexPriceMinimum } €
                      </small>
                      <br />
                      { BERLIN_STOCK_PHOTOS && (
                        <small>
                          Minimum price for RAW: 20 €
                        </small>
                      )}
                      {!valid && (
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
                    { (parseFloat(suggestedPrice) > 0 || cartProducts.length > 0) && (
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
                    { isNaN(parseFloat(suggestedPrice)) && (
                      <div className="purchase-form-spinner">
                        <Spinner />
                      </div>
                    )}
                    { BERLIN_STOCK_PHOTOS && (
                      <div className="bsp-print-link">
                        <small>
                          <Link to="/stock-photos/prints">
                            Want a print of this photo?
                          </Link>
                        </small>
                      </div>
                    )}
                  </div>
                  {/* { contentItem.physicalFormats.length > 1 && (
                    <div className="purchase-form-alternate-formats">
                      <h3>Other Formats</h3>
                      { contentItem.physicalFormats.split('\n').map(slug => {
                        const item = getContentItemBySlug(allContentItems, slug)
                        if (item) {
                          return (
                            <Link
                              key={item.slug}
                              to={`/label/${item.slug}`}
                            >
                              { item.title }
                            </Link>
                          )
                        }
                      })}
                    </div>
                  )} */}
                </div>
              )}
              { showPurchaseForm && contentItem.acceptingDonations && (
                <div>
                  <h4>Contributing to this project</h4>
                </div>
              )}
            </div>
            { category !== 'venue-calendar' && attachedPlaylist && attachedPlaylist.tracks && attachedPlaylist.tracks.length > 0 && (
              <TrackPlayPauseButton 
                track={attachedPlaylist.tracks[0]}
                activeFor={attachedPlaylist.tracks}
              />
            )}
            { category === 'venue-calendar' && activeLiveStream === contentItem.slug && (
              <PlayPauseButton
                onClick={() => {
                  dispatch(closePopup())
                  setTimeout(() => {
                    history.push('/venue/main-stage')
                  })
                }}
                playing={false}
              />
            )}
          </div>
        </header>
        <div className="detail-popup-details">
          {/* { showPurchaseForm && (
            <h2 className="main-subheading">Details</h2>
          )} */}
          { contentItem.description.replace(/ /g, '').length > 0 && (
            <div
              className="mega-blurb"
              dangerouslySetInnerHTML={{
                __html: marked(contentItem.blurb),
              }}
            />
          )}
          <div 
            className="detail-cms-text"
            dangerouslySetInnerHTML={{
            __html: marked(contentItem.description.replace(/ /g, '').length === 0 ?  contentItem.blurb : contentItem.description),
            }} 
          />
          <div className="detail-popup-details-sidebar">
            { attachedPlaylist && attachedPlaylist.tracks && attachedPlaylist.tracks.length > 1 && (
              <div className="detail-popup-details-sidebar-section">
                <ul className="detail-popup-details-playlist">
                  { attachedPlaylist.tracks.map(track => (
                    <li
                      className={ playing && currentTrackId === track.id ? 'active' : ''}
                      key={track.id}
                    >
                      <TrackPlayPauseButton track={track} />
                      <span className="detail-popup-details-playlist-text">{ track.title }</span>
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
      <div className="scroll-down-pointer">
        <ChevronButton onClick={noop} />
      </div>
    </section>
  )
}

export default DetailPopUp
