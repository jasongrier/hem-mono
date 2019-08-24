import { useSeoMeta as baseUseSeoMeta } from '../../../../common/hooks'
import { IArticle } from '../store'

interface IOpts {
  path: string
  articleData: IArticle
}

function useSeoMeta({
  path,
  articleData,
}: IOpts) {
  let seoMeta

  if (path === '/') {
    seoMeta = {
      title: 'Jason Grier | Home',
      description: '',
      keywords: ''
    }
  }

  else if (!articleData) {
    seoMeta = {
    title: 'Jason Grier | Not found',
    description: '',
    keywords: ''
    }
  }

  else {
    seoMeta = {
    title: 'Jason Grier | ' + articleData.title,
    ...articleData.seoMeta,
    }
  }

  baseUseSeoMeta(seoMeta)
}

export default useSeoMeta
