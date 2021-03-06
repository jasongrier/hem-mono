import React, { ReactElement, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../../config'
import { RootState } from '../../../../index'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

interface IProps {}

function LandingPageNot({ children }: PropsWithChildren<IProps>): ReactElement {
  const { currentProject } = useSelector((state: RootState) => ({
    currentProject: state.content.currentProject,
  }))

  const landingPageSpecs = PROJECT_CONFIGS[currentProject].LANDING_PAGES || []

  let isLandingPage: boolean = false

  // for (const candidate of landingPageSpecs) {
  //   if (candidate.domains.includes(window.location.hostname)) {
  //     isLandingPage = true
  //     break
  //   }
  // }

  return (
    isLandingPage
      ? <span />
      : <>{ children }</>
  )
}

export default LandingPageNot
