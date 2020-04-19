import React, { ReactElement } from 'react'
// @ts-ignore
import autop from 'lines-to-paragraphs'
import { LaunchDetailPopupButton, MainContentList } from '../modules/content'

function Label(): ReactElement {
  return (
    <div className="page page-projects">
      <MainContentList
        blurb={autop(`
        `)}
        buttonText={undefined}
        campaignMonitorId="5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756"
        filters={[
          'Composition',
          'Desktop/Mobile Apps',
          'Electron',
          'Javascript',
          // 'New Media',
          'NPM Modules',
          'Expanded Poetics',
          'React',
          'Sound Studies',
        ]}
        tag="projects"
        title="Projects"
      >
        {(project) => (
          <>
            <LaunchDetailPopupButton
              contentItem={project}
              showPurchaseForm={false}
            >
              Learn more
            </LaunchDetailPopupButton>

            { project.acceptingDonations && (
              <LaunchDetailPopupButton contentItem={project}>
                Contribute
              </LaunchDetailPopupButton>
            )}
          </>
        )}
      </MainContentList>
    </div>
  )
}

export default Label
