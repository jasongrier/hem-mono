import React, { ReactElement } from 'react'
import { useSeoMeta } from '../../../../common/hooks'

function DefaultSeoMeta(): ReactElement {
  useSeoMeta({
    title: 'Jason Grier | Home',
    description: '',
    keywords: ''
  })

  return (
    <div />
  )
}

export default DefaultSeoMeta
