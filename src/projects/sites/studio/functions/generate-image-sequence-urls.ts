interface IArguments {
  base: string
  end: number
  ext: string
  start: number
}

function generateImageSequenceUrls({base, start, end, ext}: IArguments) {
  const images = []
  for (let i = 3130; i <= 3255; i ++) { // TODO: Install Prettier/Eslint
    images.push(`${base}${i}.${ext}`)
  }
  return images
}

export default generateImageSequenceUrls
