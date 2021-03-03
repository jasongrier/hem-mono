function getQueryVar(nameToGet: string) {
  const query = window.location.search.substring(1)
  const queryVars = query.split('&')

  for (const queryVar of queryVars) {
    const [name, value] = queryVar.split('=')

    if (decodeURIComponent(name) === nameToGet) {
      return decodeURIComponent(value)
    }
  }
}

export default getQueryVar
