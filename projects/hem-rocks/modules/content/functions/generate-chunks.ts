import { flatten, compact } from 'lodash'
import { slugify } from 'voca'
import { IContentItem, compressIndex, hasCategory, getContentItemBySlug, getContentItemById, getContentItemsFromList, hasTag } from '../index'
import { curatedPlaylists } from '../../app'

function generateChunks(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { writeFileSync } = remote.require('fs')
  const { join } = remote.require('path')

  const terms = [
    'apps',
    'articles',
    'artists',
    'blog',
    'editions',
    'label',
    'news',
    'newsletters',
    'playlists',
    'press-clippings',
    'program',
    'recipes',
    'settings',
    'site-texts',
    'sound-library',
    'todos',
    'tracks',
    'tutorials',
    'videos',
    {
      name: 'curated-playlists',
      getContentItems(allContentItems: any) {
        this.contentItems = this.contentItems.concat(flatten((curatedPlaylists as any).map(({ name }: any) => {
          const slug = slugify(name)
          const listItem = getContentItemBySlug(allContentItems, slug)
          const attachments = getContentItemsFromList(allContentItems, slug)

          return [listItem].concat(attachments)
        })))
      },
      contentItems: [] as IContentItem[],
    },
    {
      name: 'home-features',
      getContentItems(allContentItems: any) {
        const homeFeaturesItems = allContentItems.filter((item: any) => hasTag(item, 'home-features'))
        const homeHeroineItem = getContentItemBySlug(allContentItems, 'update-march-2021')

        this.contentItems = homeFeaturesItems.concat(homeHeroineItem)
      },
      contentItems: [] as IContentItem[],
    },
    {
      name: 'press-releases',
      getContentItems(allContentItems: any) {
        const pressReleaseItems = allContentItems.filter((item: any) => hasCategory(item, 'press-releases'))
        const attachedPlaylists = compact(pressReleaseItems.map((item: IContentItem) => getContentItemById(allContentItems, item.attachments)))

        this.contentItems = pressReleaseItems.concat(attachedPlaylists)
      },
      contentItems: [] as IContentItem[],
    },
    {
      name: 'embedded-essays',
      getContentItems(allContentItems: any) {
        this.contentItems = allContentItems.filter((item: any) =>
          hasCategory(item, 'articles')
          && hasTag(item, 'sound-library')
        )
      },
      contentItems: [] as IContentItem[],
    },
  ]

  const chunks = terms.map(term =>
    typeof term === 'object' ? term : ({
      name: term,
      getContentItems: null,
      contentItems: [],
    })
  )

  for (const chunk of chunks) {
    if (typeof chunk.getContentItems === 'function') {
      chunk.getContentItems(allContentItems)
    }

    else {
      for (const oldItem of allContentItems) {
        const newItem = Object.assign({}, oldItem)
        if (hasCategory(newItem, chunk.name)) {
          // @ts-ignore
          chunk.contentItems.push(newItem)
        }
      }
    }
  }

  for (const chunk of chunks) {
    const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', chunk.name + '.json')
    const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', chunk.name + '.json')

    // ***** DANGER ZONE *****
    // ***** DANGER ZONE *****
    // ***** DANGER ZONE *****

    writeFileSync(srcIndex, JSON.stringify(compressIndex(chunk.contentItems)))
    writeFileSync(distIndex, JSON.stringify(compressIndex(chunk.contentItems)))
  }
}

export default generateChunks
