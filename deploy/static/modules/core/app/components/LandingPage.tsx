import React, { PropsWithChildren, ReactElement } from 'react'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { find } from 'lodash'
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

  const { pathname } = useLocation()

  if (!currentProject) return <div />
  if (!currentLandingPage === undefined) return <div />
  if (!PROJECT_CONFIGS[currentProject].LANDING_PAGES) return <>{ children }</>
  if (!PROJECT_CONFIGS[currentProject].LANDING_PAGES.length) return <>{ children }</>
  if (currentLandingPage === '') return <>{ children }</>
  if (pathname.indexOf('/admin') === 0) return <>{ children }</>

  const landingPageSpec: ILandingPageSpec | null = find(
    PROJECT_CONFIGS[currentProject].LANDING_PAGES,
    { name: currentLandingPage },
  )

  if (!landingPageSpec) return <>{ children }</>

  const LandingPageComponent = landingPageComponents[landingPageSpec.component]

  if (!LandingPageComponent) throw new Error('No landing page component for ' + landingPageSpec.component)

  return (
    <LandingPageComponent />
  )
}

export default LandingPage
