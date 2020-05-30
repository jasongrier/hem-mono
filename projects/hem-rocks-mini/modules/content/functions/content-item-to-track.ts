import { IContentItem } from '../'

function contentItemToTrack(contentItem: IContentItem, titleLink: string, overrides: Partial<IContentItem> = {}) {
  return {
    attribution: contentItem.attribution,
    attributionLink: contentItem.attributionLink,
    id: contentItem.slug,
    relatedContent: contentItem.relatedContent,
    relatedContentLink: contentItem.relatedContentLink,
    resource: contentItem.trackResourceId,
    title: contentItem.title,
    titleLink,
    type: 'soundcloud',
  }
}

export default contentItemToTrack
