function productClicked(item: any, currentThemeHandle: string) {
  let url

  if (currentThemeHandle) {
    url = `/products/${item.handle}?preselected-theme=${currentThemeHandle}`
  }

  else {
    url = `/products/${item.handle}`
  }

  window.location.href = url
}

export default productClicked
