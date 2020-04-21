import { compact } from 'lodash'
import { IContentItem } from '../index'
import { ITrack } from '../../../../../lib/modules/player'

function getTracksFromContentItems(contentItems: IContentItem[]): ITrack[] {
  return compact(contentItems.map(contentItem =>
    contentItem.soundCloudTrackId ? {
      id: contentItem.slug,
      resource: contentItem.soundCloudTrackId,
      type: 'soundcloud',
    } : null
  ))
}

export default getTracksFromContentItems
