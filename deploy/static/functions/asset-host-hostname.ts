function assetHostHostname() {
  return window.location.hostname === 'localhost'
    ? 'http://localhost:8888'
    : 'http://static.hem.rocks'
}

export default assetHostHostname
