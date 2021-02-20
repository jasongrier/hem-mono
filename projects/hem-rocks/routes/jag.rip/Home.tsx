import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../modules/content'
import { PROJECT_CONFIGS } from '../../config'

function Home(): ReactElement {
  const { filter: currentFilter }: any = useParams()

  return (
    <div className="page page-home">
      <Helmet>
        <title>{ PROJECT_CONFIGS['jag.rip'].HTML_HEAD_META.BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-home">
        <MainContentList
          boxBipolarX={false}
          boxBipolarY={true}
          boxMinMarginX={0}
          boxMinMarginY={0}
          boxMarginRangeX={200}
          boxMarginRangeY={0}
          boxWidth={500}
          boxHeight={350}
          boxRangeX={200}
          boxRangeY={100}
          category="projects"
          additionalCategory="site-texts"
          appendTagLinks={[
            { title: 'Info', url: '/info' },
          ]}
          currentFilter={currentFilter || 'home'}
          orderByOrder={true}
          shouldSetCurrentPlaylist={true}
          hideFilters={['Websites', 'Consulting', 'Productions']}
          speciallyOrderedTags={[
            'Home',
            'Sound',
            'Photo',
            'Text',
            'Code',
            'Labels',
            'Press',
          ]}
          excludeFromAll={['Consulting']}
        />
      </div>
    </div>
  )
}

export default Home
