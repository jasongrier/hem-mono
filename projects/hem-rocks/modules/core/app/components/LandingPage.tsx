import React, { PropsWithChildren, ReactElement } from 'react'
import { useLocation } from 'react-router'

import {
  BespokeWebDeveloper as BespokeWebDeveloperJag,
  ReactJavascriptConsulting as ReactJavascriptConsultingJag,
} from '../../../../routes/jag.rip/landing-pages'

const landingPageComponents: {[key: string]: () => ReactElement} = {
  BespokeWebDeveloperJag,
  ReactJavascriptConsultingJag,
}

interface ILandingPageSpec {
  domains: string[]
  component: string
}

interface IProps {
  landingPageSpecs: ILandingPageSpec[]
}

function LandingPage({ children, landingPageSpecs }: PropsWithChildren<IProps>): ReactElement {
  if (!landingPageSpecs.length)  {
    return (<>{ children }</>)
  }

  const { pathname } = useLocation()

  if (pathname.indexOf('/admin') === 0) {
    return (<>{ children }</>)
  }

  let spec: ILandingPageSpec | null = null

  // for (const candidate of landingPageSpecs) {
  //   if (candidate.domains.includes(window.location.hostname)) {
  //     spec = candidate
  //     break
  //   }
  // }

  if (!spec) {
    return (<>{ children }</>)
  }

  // const LandingPageComponent = landingPageComponents[spec?.component]

  if (!LandingPage) {
    return (<>{ children }</>)
  }

  return (
    <div />
    // <LandingPageComponent />
  )
}

export default LandingPage
