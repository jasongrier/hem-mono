function flashLight(id: string) {
  const light = document.getElementById(id)

  if (!light) return

  light.classList.add('studio__demo-light--lighted')
  setTimeout(() => {
    light.classList.remove('studio__demo-light--lighted')
  }, 100)
}

export default flashLight