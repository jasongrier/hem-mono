class PlaybackEngine {
  private static instance: PlaybackEngine

  static getInstance() {
    if (!PlaybackEngine.instance) {
      PlaybackEngine.instance = new PlaybackEngine()
      // ... any one time initialization goes here ...
    }
    return PlaybackEngine.instance
  }
}

export default PlaybackEngine

