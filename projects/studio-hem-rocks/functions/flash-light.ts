function flashLight(id: string) {
  const light = document.getElementById(id)

  if (!light) return

  light.classList.add('studio-demo-light-flashing')
  setTimeout(() => {
    light.classList.remove('studio-demo-light-flashing')
  }, 100)
}

export default flashLight