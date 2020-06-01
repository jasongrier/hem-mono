export const nudge = (obj: {[key: string]: any}, key: string | number, value: any, limit: number) => {
  obj[key] = value

  let keys = Object.keys(obj)

  if (keys.length - 1 > limit) {
    keys.shift()
  }

  const nudgedObj = {}

  for (const key of keys) {
    nudgedObj[key] = obj[key]
  }

  return nudgedObj
}