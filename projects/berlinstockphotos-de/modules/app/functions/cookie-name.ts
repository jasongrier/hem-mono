const cookiePrefix = 'berlinstockphotos-cookie-'

function getCookieName(baseName: string) {
  return `${cookiePrefix}-${baseName}`
}

function getCookieBaseName(cookieName: string) {
  return cookieName.replace(cookieName, cookiePrefix)
}

export {
  getCookieName,
  getCookieBaseName,
}
