import { last } from 'lodash'
import { IArticle } from '.'

function formatArticleData(rawArticleData: any) {
  const article: IArticle = {
    blurb: rawArticleData.blurb,
    category: rawArticleData.category,
    dataUrl: rawArticleData.url,
    keyArtImage: rawArticleData.keyArtImage,
    keyArtComponent: rawArticleData.keyArtComponent,
    keyArtComponentProps: rawArticleData.keyArtComponentProps,
    order: rawArticleData.order,
    status: rawArticleData.status,
    subCategory: rawArticleData.subCategory,
    tags: rawArticleData.tags,
    title: rawArticleData.title,
    url: (last(rawArticleData.url.split('/')) as string).replace(/\.md\.json$/, ''),
  }
  return article
}

export {
  formatArticleData,
}
