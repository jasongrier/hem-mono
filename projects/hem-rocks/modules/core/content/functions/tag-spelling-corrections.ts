function tagSpellingCorrections(tag: string, split: boolean = false) {
  const map: any = {
    'Nkz': 'NKZ',
    'Spaetis': 'Spätis',
    'Wtf': 'WTF',
    'Best Of': 'Best of',
  }

  return (
    split
      ? tag.split(', ').map(t => map[t] || t).join(', ')
      : map[tag] || tag
  )
}

export default tagSpellingCorrections
