function alphabeticalAscSort(collection: string[]) {
  const sortedCollection = Array.from(collection)

  sortedCollection.sort((a, b) => {
    if(a < b) { return -1 }
    if(a > b) { return 1 }
    return 0
  })

  return sortedCollection
}

export { alphabeticalAscSort }
