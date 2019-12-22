function removePrice(title: string) {
  return title.split(' – ')[0]
}

export default removePrice
