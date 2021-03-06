import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Deva } from '../../../components/layout'
import { BASE_SITE_TITLE } from '../../../config'

function DanceParty(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-dance-party">
        <div style={{
          position: 'fixed',
          top: '30px',
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 999999,
          backgroundColor: '#fff',
          textAlign: 'center',
        }}>
          <Deva name="bird-of-pointerdise" />
          <Deva name="chill-fishy" />
          <Deva name="clever-courtesan" />
          <Deva name="duolingo" />
          <Deva name="el-topo" />
          <Deva name="emerralda" />
          <Deva name="great-teacher" />
          <Deva name="instructive-maus" />
          <Deva name="kuhllucko" />
          <Deva name="lu-see" />
          <Deva name="mr-namaste" />
          <Deva name="oui-oui-toad" />
          <Deva name="pointer-sisters" />
          <Deva name="puppypointer" />
          <Deva name="running-fire" />
          <Deva name="sagey-swan" />
          <Deva name="smoochy" />
          <Deva name="velvet-voice-of-concern" />
          <Deva name="winter-spirit" />
          <Deva name="wise-crepe" />
          <Deva name="ziggy" />
        </div>
      </div>
    </>
  )
}

export default DanceParty
