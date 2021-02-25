import { isEmpty } from 'lodash'
import { IContentItem } from '../index'

function getTerms(item: IContentItem, termTaxonomy: 'tags' | 'properties') {
  if (isEmpty(item[termTaxonomy])) return false
  let terms = item[termTaxonomy].split(',')
  terms = terms.filter((t: string) => !/\A\s*\z/.test(t))
  return terms
}

function hasTerm(item: IContentItem, term: string, termTaxonomy: 'tags' | 'properties') {
  if (isEmpty(item[termTaxonomy])) return false
  let terms = item[termTaxonomy].split(',')
  if (!terms.length) return false
  terms = terms.map(t => t.trim())
  return terms.includes(term)
}

function addTerm(item: IContentItem, term: string, termTaxonomy: 'tags' | 'properties') {
  let terms = item[termTaxonomy].split(',')
  terms = terms.concat([term])
  terms = terms.filter(t => !/\A\s*\z/.test(t))
  return terms.join(', ')
}

function removeTerm(item: IContentItem, term: string, termTaxonomy: 'tags' | 'properties') {
  let terms = item[termTaxonomy].split(',')
  terms = terms.filter(t => t !== term)
  terms = terms.filter(t => !/\A\s*\z/.test(t))
  return terms.join(', ')
}

function getTags(item: IContentItem) {
  getTerms(item, 'tags')
}

function hasTag(item: IContentItem, tag: string) {
  hasTerm(item, tag, 'tags')
}

function addTag(item: IContentItem, tag: string) {
  addTerm(item, tag, 'tags')
}

function removeTag(item: IContentItem, tag: string) {
  removeTerm(item, tag, 'tags')
}

function getProperties(item: IContentItem) {
  getTerms(item, 'properties')
}

function hasProperty(item: IContentItem, property: string) {
  hasTerm(item, property, 'properties')
}

function addProperty(item: IContentItem, property: string) {
  addTerm(item, property, 'properties')
}

function removeProperty(item: IContentItem, property: string) {
  removeTerm(item, property, 'properties')
}

export {
  addProperty,
  addTag,
  addTerm,
  getProperties,
  getTags,
  getTerms,
  hasProperty,
  hasTag,
  hasTerm,
  removeProperty,
  removeTag,
  removeTerm,
}
