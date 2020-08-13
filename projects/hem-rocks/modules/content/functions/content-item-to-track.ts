import { ITrack } from '../../../../../lib/modules/website-player'
import { assetHostHostname } from '../../../functions'
import { IContentItem, hasTag } from '../'

function contentItemToTrack(contentItem: IContentItem): ITrack {
  return {
    attribution: contentItem.attribution,
    attributionLink: contentItem.attributionLink,
    id: contentItem.slug,
    relatedContent: contentItem.relatedContent,
    relatedContentLink: contentItem.relatedContentLink,
    resource: assetHostHostname() + '/hem-rocks/content/tracks/' + contentItem.audioFilename,
    secret: null,
    secondaryAttribution: contentItem.secondaryAttribution,
    secondaryAttributionLink: contentItem.secondaryAttributionLink,
    title: contentItem.title,
    titleLink: hasTag(contentItem, 'attachment') ? contentItem.relatedContentLink : `tracks#${contentItem.slug}`,
  }
}

export default contentItemToTrack
