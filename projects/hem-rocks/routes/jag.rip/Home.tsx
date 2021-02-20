import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation, useParams } from 'react-router-dom'
import { MainContentList } from '../../modules/content'
import { PROJECT_CONFIGS } from '../../config'

function Home(): ReactElement {
  const { pathname }: any = useLocation()
  const { filter: currentFilter }: any = useParams()

  return (
    <div className="page page-home">
      <Helmet>
        <title>{ PROJECT_CONFIGS['jag.rip'].HTML_HEAD_META.BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
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
        prependTagLinks={[
          { title: 'Home', url: '/' },
        ]}
        appendTagLinks={[
          { title: 'Info', url: '/info' },
        ]}
        currentFilter={currentFilter || 'home'}
        orderByOrder={pathname === '/'}
        shouldSetCurrentPlaylist={true}
        hideFilters={['Home', 'Websites', 'Consulting', 'Productions', 'Case Studies']}
        excludeFromAll={['Consulting']}
        linkTo={contentItem => `home/${contentItem.slug}`}
        speciallyOrderedTags={[
          'Music %26 Sound',
          'Photo %26 Film',
          'Text',
          'Code',
          'Press',
        ]}
      />
    </div>
  )
}

export default Home
