import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { find } from 'lodash'
import { setIsLandingPage } from '../index'
import { RootState } from '../../../../index'
import { PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../../config'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

import {
  BespokeWebDeveloper as BespokeWebDeveloperJag,
  ReactJavascriptConsulting as ReactJavascriptConsultingJag,
} from '../../../../routes/jag.rip/landing-pages'

const landingPageComponents: {[key: string]: () => ReactElement} = {
  BespokeWebDeveloperJag,
  ReactJavascriptConsultingJag,
}

interface ILandingPageSpec {
  name: string
  component: string
}

function LandingPage({ children }: PropsWithChildren<{}>): ReactElement {
  const { currentLandingPage, currentProject } = useSelector((state: RootState) => ({
    currentLandingPage: state.content.currentLandingPage,
    currentProject: state.content.currentProject,
  }))

  const dispatch = useDispatch()

  const [LandingPageComponent, setLandingPageComponent] = useState<any>()

  const { pathname } = useLocation()

  useEffect(() => {
    if (!currentProject) return
    if (!currentLandingPage === undefined) return
    if (!PROJECT_CONFIGS[currentProject].LANDING_PAGES) return
    if (!PROJECT_CONFIGS[currentProject].LANDING_PAGES.length) return
    if (currentLandingPage === '') return
    if (pathname.indexOf('/admin') === 0) return

    const landingPageSpec: ILandingPageSpec | null = find(
      PROJECT_CONFIGS[currentProject].LANDING_PAGES,
      { name: currentLandingPage },
    )

    if (!landingPageSpec) return

    const component = landingPageComponents[landingPageSpec.component]

    if (!component) throw new Error('No landing page component for ' + landingPageSpec.component)

    setLandingPageComponent(component)
    dispatch(setIsLandingPage(true))
  }, [currentLandingPage, currentProject])

  return (
    LandingPageComponent || <>{ children }</>
  )
}

export default LandingPage
