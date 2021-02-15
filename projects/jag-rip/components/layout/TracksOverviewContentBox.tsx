import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { titleCase } from 'voca'
import { IContentItem, MainContentBox } from '../../modules/content'
import { TracksBoxChild } from './'

interface IProps {
  allContentItems: IContentItem[]
  contentItem: IContentItem
  filter: string
  index: number
  tag: string
}

function TracksOverviewContentBox({ allContentItems, contentItem, filter, index, tag }: IProps): ReactElement {
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
      renderActionsOn="key-art"
    >
      <TracksBoxChild
        allContentItems={allContentItems}
        item={contentItem}
      />
    </MainContentBox>
  )
}

export default TracksOverviewContentBox
