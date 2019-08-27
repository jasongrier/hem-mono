export default function removeDups(names) {
  let unique = {}
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true
    }
  })
  return Object.keys(unique)
}
