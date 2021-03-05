import { flatten, compact } from 'lodash'
import { slugify } from 'voca'
import { IContentItem, compressIndex, hasCategory, getContentItemBySlug, getContentItemsFromRawList, getContentItemById, getContentItemsFromList, hasTag } from '../index'
import { PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../../config'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

function outputFilter(items: IContentItem[], currentProject: string) {
  return items
  // return items.filter(i =>
  //   hasCategory(i, 'settings')
  //   || (
  //     i.published
  //     && parseInt(i.releasePhase, 10) >= PROJECT_CONFIGS.RELEASE_PHASE
  //     && i.project === currentProject
  //   )
  // )
}

function generateChunks(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { writeFileSync } = remote.require('fs')
  const { join } = remote.require('path')
  const { description: currentProject } = getContentItemBySlug(allContentItems, 'setting-current-project')

  const terms = [
    'apps',
    'articles',
    'artists',
    'blog',
    'editions',
    'general-content',
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
        const curatedPlaylists = PROJECT_CONFIGS[currentProject].CURATED_PLAYLISTS

        this.contentItems = curatedPlaylists
          ? this.contentItems.concat(flatten((curatedPlaylists as any).map(({ name, slug: givenSlug }: any) => {
              const slug = givenSlug ? givenSlug : slugify(name)
              const listItem = getContentItemBySlug(allContentItems, slug)
              const attachments = getContentItemsFromList(allContentItems, slug)

              return [listItem].concat(attachments)
            })))
          : []
      },
      contentItems: [] as IContentItem[],
    },
    {
      name: 'home-features',
      getContentItems(allContentItems: any) {
        const homeFeaturesItems = allContentItems.filter((item: any) => (
          hasTag(item, 'home-features')
          && item.project === currentProject
        ))
        const homeHeroineItem = getContentItemBySlug(allContentItems, 'update-march-2021')

        this.contentItems = homeFeaturesItems.concat(homeHeroineItem)
      },
      contentItems: [] as IContentItem[],
    },
    {
      name: 'press-releases',
      getContentItems(allContentItems: any) {
        const pressReleaseItems = allContentItems.filter((item: any) => (
          hasCategory(item, 'press-releases')
          && item.project === currentProject
        ))

        const attachedPlaylists = compact(pressReleaseItems.map((item: IContentItem) => (
          getContentItemById(allContentItems, item.attachments)
          && item.project === currentProject
        )))

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
          && item.project === currentProject
        )
      },
      contentItems: [] as IContentItem[],
    },
    {
      name: 'image-gallery',
      getContentItems(allContentItems: any) {
        const galleries = allContentItems.filter((item: any) =>
          hasCategory(item, 'image-gallery')
          && item.project === currentProject
        )

        let galleriesAndImages: IContentItem[] = Array.from(galleries)

        for (const gallery of galleries) {
          const attachments = getContentItemsFromRawList(allContentItems, gallery.attachments)
          galleriesAndImages = galleriesAndImages.concat(attachments)
        }

        this.contentItems = galleriesAndImages
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
      chunk.getContentItems(outputFilter(allContentItems, currentProject))
    }

    else {
      for (const oldItem of outputFilter(allContentItems, currentProject)) {
        const newItem = Object.assign({}, oldItem)
        if (hasCategory(newItem, chunk.name)) {
          // @ts-ignore
          chunk.contentItems.push(newItem)
        }
      }
    }
  }

  for (const chunk of chunks) {
    const srcIndex = join(__dirname, '..', '..', '..', '..', 'static', 'content', chunk.name + '.json')
    const distIndex = join(__dirname, '..', '..', '..', '..', '..', '..', 'dist', 'static', 'content', chunk.name + '.json')

    // ***** DANGER ZONE *****
    // ***** DANGER ZONE *****
    // ***** DANGER ZONE *****

    writeFileSync(srcIndex, JSON.stringify(compressIndex(chunk.contentItems)))
    writeFileSync(distIndex, JSON.stringify(compressIndex(chunk.contentItems)))
  }
}

export default generateChunks
