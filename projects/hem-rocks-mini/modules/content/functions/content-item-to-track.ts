import { IContentItem } from '../'
import { ITrack } from '../../../../../lib/modules/player'

function contentItemToTrack(contentItem: IContentItem, titleLink: string, overrides: Partial<IContentItem> = {}): ITrack {
  return {
    attribution: contentItem.attribution,
    attributionLink: contentItem.attributionLink,
    id: contentItem.slug,
    relatedContent: contentItem.relatedContent,
    relatedContentLink: contentItem.relatedContentLink,
    resource: contentItem.trackResourceId,
    secret: contentItem.trackResourceSecret,
    title: contentItem.title,
    titleLink,
    type: 'soundcloud',
  }
}

export default contentItemToTrack
