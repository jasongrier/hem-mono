import { ITaggedSubject, ITagMeta } from './types'

export default function(taggedSubjects: ITaggedSubject[]): ITagMeta[] {
  const tags = taggedSubjects.reduce((acc, s) => {
    return acc.concat(s.tags)
  }, [] as any[])

  const tagCounts = tags.reduce((acc: any[], tagName: string) => {
    const existingTag = acc.find((tag) => tag.name === tagName)
    const tagCount = taggedSubjects.filter(s => s.tags.indexOf(tagName) > -1).length

    if (existingTag) {
      existingTag.count += tagCount
      return acc
    }

    else {
      return acc.concat({
        name: tagName,
        count: tagCount
      })
    }
  }, [] as any[])

  tagCounts.sort((a: any, b: any) => {
    if (a.count === b.count) {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()

      if (nameA < nameB) {
        return 1
      }

      if (nameA > nameB) {
        return -1
      }

      else {
        return 0
      }
    }

    else {
      return b.count - a.count
    }
  })

  return tagCounts
}
