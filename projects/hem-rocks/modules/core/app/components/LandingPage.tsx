import React, { PropsWithChildren, ReactElement, Suspense } from 'react'
import { find } from 'lodash'
import { Spinner } from '../../../../../../lib/components'

interface ILandingPageSpec {
  domains: string[]
  componentPath: string
}

interface IProps {
  landingPages: ILandingPageSpec[]
}

function LandingPage({ children, landingPages: landingPageSpecs }: PropsWithChildren<IProps>): ReactElement {
  const domain = window.location.hostname

  if (!landingPageSpecs.length)  return (<div />)

  let spec: ILandingPageSpec

  for (const candidate of landingPageSpecs) {
    if (spec.domains.includes(domain)) {
      spec = candidate
      break
    }
  }

  if (!spec) return (<div />)

  const LandingPageContent = React.lazy(() => import(spec.componentPath))

  return (
    <Suspense fallback={<Spinner />}>
      {spec
        ? <LandingPageContent />
        : children
      }
    </Suspense>
  )
}

export default LandingPage
