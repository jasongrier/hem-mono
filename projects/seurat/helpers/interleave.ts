export const interleave = (...arrays: Array<Array<string>>) => {
  const maxLength = Math.max.apply(Math, arrays.map((arr) => {
    return arr.length
  }))

  const result = []

  for (let i = 0; i < maxLength; i ++) {
    arrays.forEach((array) => {
      if (array.length > i) {
        result.push(array[i])
      }
    })
  }

  return result
}