import { map } from 'lodash'
import { IContentItem } from '../index'

function tpl(s: string, i: number) {
  return s + '-' + i
}

function uniqueSlug(desiredSlug: string, allContentItems: IContentItem[]) {
  const allSlugs = map(allContentItems, 'slug')

  if (!allSlugs.includes(desiredSlug)) return desiredSlug

  let i = 1

  while (allSlugs.includes(tpl(desiredSlug, i))) {
    i ++
  }

  return tpl(desiredSlug, i)
}

export default uniqueSlug
