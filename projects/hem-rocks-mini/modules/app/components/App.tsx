import React, { ReactElement, useEffect } from 'react'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { find } from 'lodash'
import ReactGA from 'react-ga'
import { CartPopup } from '../../cart'
import { ThankYouPopup } from '../../cart'
import { DetailPopUp, setCurrentContentItem } from '../../content'
import { ElectronOnly, ScrollToTop, HamburgerMenu } from '../../../../../lib/components'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup, closePopup } from '../../../../../lib/modules/popups'
import { usePrevious } from '../../../../../lib/hooks'
import { collapseTopBar, expandTopBar, MainNavItem, PlayerBar, TopBar } from '../index'
import { RootState } from '../../../index'
import EmailForm from './EmailForm'

import {
  Admin,
  Home,
  Info,
  Label,
  Projects,
  SoundLibrary,
  Venue,
} from '../../../routes'

ReactGA.initialize('UA-163585797-1')

function App(): ReactElement {
  const { contentItems, currentContentItem, currentlyOpenPopUp, topBarCollapsed } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
    currentContentItem: state.content.currentContentItem,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
    topBarCollapsed: state.app.topBarCollapsed,
  }))

  const dispatch = useDispatch()

  const { pathname } = useLocation()

  const history = useHistory()

  const genericRoutedPopups = [
    { basePath: 'label', id: 'detail-popup' },
    { basePath: 'projects', id: 'detail-popup' },
    { basePath: 'sound-library', id: 'detail-popup' },
  ]

  useEffect(function routedPopup() {
    const [basePath, slug] = pathname.replace(/^\//, '').split('/')
    const requestedContentItem = find(contentItems, { slug })

    let popupId

    if (
      basePath === 'cart'
      || slug === 'cart'
    ) {
      popupId = 'cart-popup'
    }

    if (basePath === 'thank-you') {
      popupId = 'thank-you-popup'
    }

    if (!popupId) {
      for (const routedPopup of genericRoutedPopups) {
        if (
          basePath === routedPopup.basePath
          && requestedContentItem
        ) {
          popupId = routedPopup.id
          break
        }
      }
    }

    if (popupId === currentlyOpenPopUp) return

    if (popupId) {

      dispatch(closePopup())

      if (requestedContentItem) {
        dispatch(setCurrentContentItem(requestedContentItem))
      }

      dispatch(openPopup(popupId))
    }
  }, [pathname])

  const previouslyOpenPopup = usePrevious(currentlyOpenPopUp)

  useEffect(function closePopup() {
    if (!currentlyOpenPopUp && previouslyOpenPopup) {
      const pathnameSplit = pathname.replace(/^\//, '').split('/')
      let path = '/'

      if (
        pathnameSplit[0] === 'info'
        && pathnameSplit[1] === 'cart'
      ) {
        path += 'info'
      }

      if (
        pathnameSplit[0] === 'venue'
        && pathnameSplit[1] === 'cart'
      ) {
        path += 'venue'
      }

      else if (
        pathnameSplit[0] === 'label'
        || pathnameSplit[0] === 'projects'
        || pathnameSplit[0] === 'sound-library'
      ) {

        path += pathnameSplit[0]

        if (pathnameSplit[2]) {
          path += '/filter/' + pathnameSplit[2]
        }
      }

      history.push(path)
    }
  }, [currentlyOpenPopUp, previouslyOpenPopup])

  useEffect(function setTopBar() {
    if (pathname !== '/') {
      dispatch(collapseTopBar())
    }

    else {
      dispatch(expandTopBar())
    }
  }, [pathname])

  useEffect(function trackPageView() {
    ReactGA.pageview(pathname)
  }, [pathname])

  return (
    <div className="hem-application">
      <ScrollToTop />

      <TopBar collapsed={topBarCollapsed} />

      <nav className={`main-nav${pathname === '/' ? ' large-nav' : ''}`}>
        <ul className="main-nav-items">
          <MainNavItem name="Sound Library" />
          <MainNavItem name="Label" />
          <MainNavItem name="Venue" />
          <MainNavItem name="Software" />
          <li className="main-nav-item">
            <NavLink
              to={(() => {
                const [tag, filter, filterName] = pathname.replace(/^\//, '').split('/')

                if (filter === 'filter') {
                  return `/${tag}/cart/${filterName}`
                }

                return `${pathname !== '/' ? pathname : ''}/cart`
              })()}
              onClick={() => dispatch(collapseTopBar())}
            >
              Cart
            </NavLink>
          </li>
        </ul>
        <HamburgerMenu>
          <ul>
            <MainNavItem name="Info" />
            <MainNavItem name="Merch" />
            <MainNavItem name="Mixes" />
            <MainNavItem name="Mailing List" />
            <ElectronOnly>
              <MainNavItem name="Admin" />
            </ElectronOnly>
          </ul>
        </HamburgerMenu>
      </nav>
      <main className="main-content">
        <div className="tabs-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Home} />
            <Route exact path="/thank-you" component={Home} />

            <Route exact path="/info" component={Info} />
            <Route exact path="/info/cart" component={Info} />

            <Route exact path="/label/:contentItemSlug?/:filter?" component={Label} />
            <Route exact path="/label/filter/:filter" component={Label} />
            <Route exact path="/label/cart/:filter?" component={Label} />

            <Route exact path="/projects/:contentItemSlug?/:filter?" component={Projects} />
            <Route exact path="/projects/filter/:filter" component={Projects} />
            <Route exact path="/projects/cart/:filter?" component={Projects} />

            <Route exact path="/sound-library/:contentItemSlug?/:filter?" component={SoundLibrary} />
            <Route exact path="/sound-library/filter/:filter" component={SoundLibrary} />
            <Route exact path="/sound-library/cart/:filter?" component={SoundLibrary} />

            <Route exact path="/venue" component={Venue} />
            <Route exact path="/venue/cart" component={Venue} />

            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/create" component={Admin} />
            <Route exact path="/admin/edit/:itemSlug" component={Admin} />
          </Switch>
        </div>
      </main>
      <footer>

      </footer>

      <PopupContainer
        closeIcon={CloseButton}
        id="detail-popup"
      >
        <DetailPopUp
          contentItem={currentContentItem}
          filter={pathname.split('/')[3]}
          tag={pathname.split('/')[1]}
        />
      </PopupContainer>

      <PopupContainer
        closeIcon={CloseButton}
        escapeKeyCloses={false}
        id="cart-popup"
      >
        {(props: any) => (
          <CartPopup
            redirecting={props?.redirecting}
            returnUrl={props?.returnUrl}
          />
        )}
      </PopupContainer>

      <PopupContainer
        closeIcon={CloseButton}
        id="email-popup"
      >
        <EmailForm />
      </PopupContainer>

      <PopupContainer
        closeIcon={CloseButton}
        id="thank-you-popup"
      >
        {(props: any) => (
          <ThankYouPopup itemSlugs={props?.itemSlugs} />
        )}
      </PopupContainer>

      <PlayerBar />
    </div>
  )
}

export default App
