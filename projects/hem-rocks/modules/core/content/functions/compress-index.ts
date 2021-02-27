import modelize from './modelize'
import { IContentItem } from '..'
import { has, invert } from 'lodash'

function compressIndex(index: any) {
  const defaults = modelize({}) as any
  const compressedIndex: any[] = []

  for (const item of index) {
    const compressedItem: any = {}

    for (const fieldName in item) {
      if (
        typeof item[fieldName] === 'boolean'
        && defaults[fieldName] !== item[fieldName]
      ) {
        compressedItem[fieldName] = item[fieldName]
      }

      else if (item[fieldName].length) {
        compressedItem[fieldName] = item[fieldName]
      }
    }

    compressedIndex.push(compressedItem)
  }

  return compressIndexKeys(compressedIndex)
}

const keyCompressionMap: any = {
  acceptingDonations: 'aa',
  aside: 'ab',
  attachments: 'bl',
  attachmentTo: 'bq',
  attribution: 'ac',
  attributionLink: 'ad',
  audioFilename: 'ae',
  badgeText: 'af',
  blurb: 'ag',
  category: 'ah',
  date: 'ai',
  description: 'aj',
  displayCategory: 'ak',
  downloadFile: 'al',
  duration: 'bn',
  externalLinkText: 'am',
  externalLinkUrl: 'an',
  fileSize: 'bt',
  fixedPrice: 'ao',
  flexPriceChoices: 'bs',
  flexPriceMinimum: 'ap',
  flexPriceRecommended: 'aq',
  hasFixedPrice: 'ar',
  id: 'as',
  isDigitalProduct: 'at',
  isPhysicalProduct: 'au',
  keyArt: 'av',
  keyArtFullPath: 'bw',
  note: 'bp',
  order: 'aw',
  physicalFormats: 'ax',
  preview: 'ay',
  project: 'bu',
  properties: 'bv',
  published: 'az',
  relatedContent: 'ba',
  relatedContentLink: 'bb',
  releaseDate: 'br',
  releasePhase: 'bc',
  secondaryAttribution: 'bd',
  secondaryAttributionLink: 'be',
  secondaryTitle: 'bf',
  slug: 'bg',
  sticky: 'bh',
  tags: 'bi',
  title: 'bj',
  titleWrapping: 'bk',
  type: 'bm',
}

export function getHighestCompressionMapKey() {
  const values = Object.values(keyCompressionMap)
  values.sort()
  console.log(values.pop())
}

getHighestCompressionMapKey()

export function validateCompressionMap() {
  const checkItem = modelize({})

  for (const key in keyCompressionMap) {
    if (!has(checkItem, key)) {
      alert(`Compression map key not found in IContentItem type!!! ${key}`)
      throw new Error(`Compression map key not found in IContentItem type!!! ${key}`)
    }
  }

  for (const key in checkItem) {
    if (!has(keyCompressionMap, key)) {
      alert(`IContentItem key not found in compression map!!! ${key}`)
      throw new Error(`IContentItem key not found in compression map!!! ${key}`)
    }
  }
}

export function compressIndexKeys(index: IContentItem[]) {
  validateCompressionMap()

  const compressedIndex = []

  for (const item of index) {
    const compressedItem: any = {}
    for (const key in keyCompressionMap) {
      compressedItem[keyCompressionMap[key]] = item[key as keyof IContentItem]
    }
    compressedIndex.push(compressedItem)
  }

  return compressedIndex
}

export function uncompressItem(compressedItem: any) {
  const invertedMap = invert(keyCompressionMap)
  const compressedItemClone = Object.assign({}, compressedItem)
  const uncompressedItem: any = {}

  for (const key in compressedItem) {
    uncompressedItem[invertedMap[key]] = compressedItemClone[key]
  }

  return uncompressedItem
}

export default compressIndex
