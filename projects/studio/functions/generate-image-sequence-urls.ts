function generateImageSequenceUrls(base: string, end: number, ext: string, start: number) {
  const images = []
  // TODO: Install Prettier/Eslint
  for (let i = start; i <= end; i ++) {
    images.push(`${base}${i}.${ext}`)
  }
  return images
}

export default generateImageSequenceUrls
