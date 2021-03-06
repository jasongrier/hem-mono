import React, { ReactElement, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../index'

interface IProps {}

function LandingPageNot({ children }: PropsWithChildren<IProps>): ReactElement {
  const { isLandingPage } = useSelector((state: RootState) => ({
    isLandingPage: state.app.isLandingPage,
  }))

  return (
    isLandingPage
      ? <span />
      : <>{ children }</>
  )
}

export default LandingPageNot
