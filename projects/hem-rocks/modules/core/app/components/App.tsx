import React, { Suspense, ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReactGA from 'react-ga'
import Cookies from 'js-cookie'
import { isEmpty } from 'lodash'
import { CartFrame } from '../../cart'
import { setCurrentProject, requestReadChunk, getContentItemBySlug } from '../../content'
import { Hide, ElectronNot, ScrollToTop, Spinner } from '../../../../../../lib/components'
import { RoutingHub, CookiesFrame, Popups, getCookieName, SplitTests, PlayerFrame } from '../index'
import { PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../../config'
import { RootState } from '../../../../index'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

const projectFrames: any = {
  'hem.rocks': React.lazy(() => import('../../../hem.rocks/components/ProjectFrame')),
  'jag.rip': React.lazy(() => import('../../../jag.rip/components/ProjectFrame')),
}

function App(): ReactElement {
  const {
    chunkLog,
    currentProject,
    currentProjectSettingItem,
  } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    currentProject: state.content.currentProject,
    currentProjectSettingItem: getContentItemBySlug(state.content.contentItems, 'setting-current-project'),
  }))

  const dispatch = useDispatch()

  const { pathname } = useLocation()

  useEffect(function loadSettings() {
    if (chunkLog.includes('settings')) return
    dispatch(requestReadChunk('settings'))
  }, [chunkLog])

  useEffect(function loadSiteText() {
    if (chunkLog.includes('site-texts')) return
    dispatch(requestReadChunk('site-texts'))
  }, [chunkLog])

  useEffect(function loadEmbeddedEssays() {
    if (chunkLog.includes('embedded-essays')) return
    dispatch(requestReadChunk('embedded-essays'))
  }, [chunkLog])

  useEffect(function loadProject() {
    if (!currentProjectSettingItem) return
    if (currentProjectSettingItem.description === currentProject) return
    dispatch(setCurrentProject(currentProjectSettingItem.description))
  }, [currentProjectSettingItem])

  useEffect(function trackPageView() {
    ReactGA.pageview(pathname)
  }, [pathname])

  useEffect(function setSplitTestCookies() {
    const { FlexPricingType } = SplitTests
    if (!Cookies.get(getCookieName(FlexPricingType, currentProject))) {
      const type = Math.random() > .5 ? 'input' : 'buttons'
      Cookies.set(getCookieName(FlexPricingType, currentProject), type, { expires: 7 })
    }
  }, [])

  if (isEmpty(currentProject)) return (<div title="Waiting for project frame" />)

  const ProjectFrame = window.process?.env.ELECTRON_MONO_DEV
    ? projectFrames['hem.rocks']
    : projectFrames[currentProject]

  if (!ProjectFrame) return (<div style={{ color: 'black' }}>No project frame found for { currentProject }!</div>)

  return (
    <div className={`
      hem-application
      ${ pathname.includes('admin') ? 'is-admin' : '' }
      ${ process.env.NODE_ENV === 'production' ? 'node-env-production' : '' }
      current-project-${currentProject.replace(/\./g, '-')}
      ${
        pathname === '/'
        || pathname === '/cart'
        || pathname === '/cart/'
        || pathname === '/thank-you'
        || pathname === '/thank-you/'
        || pathname.includes('/home')
          ? ' app-is-home'
          : ''
      }
    `}>
      <ScrollToTop scrollPaneSelector=".scroll-lock-container" />

      <div className="scroll-lock-container">
        <div className="scroll-lock-content">
          <main className="main-content">
            <Suspense fallback={<Spinner />}>
              <ProjectFrame>
                <RoutingHub />
              </ProjectFrame>
            </Suspense>
          </main>
        </div>
      </div>

      { PROJECT_CONFIGS[currentProject].HAS_PLAYER && (
        <Hide from={PROJECT_CONFIGS[currentProject].HIDE_PLAYER_FRAME_FOR}>
          <PlayerFrame />
        </Hide>
      )}

      { PROJECT_CONFIGS[currentProject].HAS_CART && (
        <CartFrame />
      )}

      <ElectronNot>
        { PROJECT_CONFIGS[currentProject].HAS_COOKIES && (
          <Hide from={PROJECT_CONFIGS[currentProject].HIDE_COOKIES_FRAME_FOR}>
            <CookiesFrame />
          </Hide>
        )}
      </ElectronNot>

      <Popups />
    </div>
  )
}

export default App
