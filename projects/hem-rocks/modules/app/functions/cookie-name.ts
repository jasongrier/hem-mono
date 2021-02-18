function getCookieName(baseName: string, prefix: string) {
  return `${prefix}-${baseName}`
}

function getCookieBaseName(cookieName: string, prefix: string) {
  return cookieName.replace(cookieName, prefix)
}

export {
  getCookieName,
  getCookieBaseName,
}
