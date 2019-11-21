function generateImageSequenceUrls(base: string, end: number, ext: string, start: number) {
  const images = []
  for (let i = start; i <= end; i ++) { // TODO: Install Prettier/Eslint
    images.push(`${base}${i}.${ext}`)
  }
  return images
}

export default generateImageSequenceUrls
