function flashLight(name: string) {
  const light = document.getElementById('clock-divider-demo-light-' + name)

  if (!light) return

  light.classList.add('studio__demo-light--lighted')
  setTimeout(() => {
    light.classList.remove('studio__demo-light--lighted')
  }, 100)
}

export default flashLight