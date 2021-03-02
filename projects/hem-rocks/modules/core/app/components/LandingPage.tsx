import React, { PropsWithChildren, ReactElement } from 'react'
import { useLocation } from 'react-router'

import {
  BespokeWebDeveloper as BespokeWebDeveloperJag,
  ReactJavascriptConsulting as ReactJavascriptConsultingJag,
} from '../../../../routes/jag.rip/landing-pages'

const landingPageComponents = {
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
  if (!landingPageSpecs.length)  return (<div />)

  const { pathname } = useLocation()

  let spec: ILandingPageSpec

  for (const candidate of landingPageSpecs) {
    if (candidate.domains.includes(window.location.hostname)) {
      spec = candidate
      break
    }
  }

  const LandingPage = pathname.indexOf('/admin') === 0
    ? null
    : landingPageComponents[spec?.component]

  return (
    <div>
      { LandingPage
        ? <LandingPage />
        : children
      }
    </div>
  )
}

export default LandingPage
