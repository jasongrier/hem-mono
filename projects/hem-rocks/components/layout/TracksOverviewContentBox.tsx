import { IPlaylist } from '../../../../lib/modules/website-player'
import React, { ReactElement } from 'react'
import { hasCategory, IContentItem, MainContentBox } from '../../modules/core/content'
import { TracksBoxChild } from './'

interface IProps {
  allTracksItems: IContentItem[]
  contentItem: IContentItem
  filter: string
  index: number
  tag: string
}

function TracksOverviewContentBox({ allTracksItems, contentItem, filter, index, tag }: IProps): ReactElement {
  return (
    <MainContentBox
      width={90}
      contentItem={contentItem}
      secondaryTitleField="attribution"
      index={index}
      filter={filter}
      tag={tag}
      minMarginX={0}
      minMarginY={0}
      marginRangeX={0}
      marginRangeY={0}
      hasReadOnLink={!hasCategory(contentItem, 'tracks')}
      linkTo={contentItem => `tracks-overview/detail/${contentItem.slug}`}
    >
      <TracksBoxChild
        allTracksItems={allTracksItems}
        item={contentItem}
      />
    </MainContentBox>
  )
}

export default TracksOverviewContentBox
