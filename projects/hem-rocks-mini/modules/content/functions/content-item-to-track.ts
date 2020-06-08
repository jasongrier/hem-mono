import { IContentItem, hasTag } from '../'
import { ITrack } from '../../../../../lib/modules/player'

function contentItemToTrack(contentItem: IContentItem): ITrack {
  return {
    attribution: contentItem.attribution,
    attributionLink: contentItem.attributionLink,
    id: contentItem.slug,
    relatedContent: contentItem.relatedContent,
    relatedContentLink: contentItem.relatedContentLink,
    resource: contentItem.trackResourceId,
    secret: contentItem.trackResourceSecret,
    secondaryAttribution: contentItem.secondaryAttribution,
    secondaryAttributionLink: contentItem.secondaryAttributionLink,
    title: contentItem.title,
    titleLink: hasTag(contentItem, 'attachment') ? contentItem.relatedContentLink : `tracks#${contentItem.slug}`,
    type: 'soundcloud',
  }
}

export default contentItemToTrack
