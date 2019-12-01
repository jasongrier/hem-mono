import { each } from 'lodash'

export interface IWebsitePlayerProgressBar {
  id: string
  onProgress: (progress: number) => void
}

class WebsitePlayer {
  private static instance: WebsitePlayer

  private progressBars: {[id: string]: IWebsitePlayerProgressBar}
  private source: HTMLAudioElement

  constructor() {
    this.progressBars = {}
    this.source = document.createElement('audio')
    this.source.addEventListener(
      'timeupdate',
      this.notifyProgressBars.bind(this),
    )
  }

  static getInstance() {
    if (!WebsitePlayer.instance) {
      WebsitePlayer.instance = new WebsitePlayer()
    }
    return WebsitePlayer.instance
  }

  private notifyProgressBars() {
    each(this.progressBars, progressBar => {
      progressBar.onProgress(this.source.currentTime / this.source.duration)
    })
  }

  public load(url: string) {
    if (!this.source) return
    this.source.src = url
  }

  public play() {
    if (!this.source) return
    this.source.play()
  }

  public pause() {
    if (!this.source) return
    this.source.pause()
  }

  public seek(position: number) {
    if (!this.source || !this.source.duration) return
    this.source.currentTime = position * this.source.duration
  }

  public setVolume(volume: number) {
    if (!this.source) return
    this.source.volume = volume
  }

  public isPlaying() {
    if (!this.source) return false
    return !this.source.paused
  }

  public destroy() {
    document.removeChild(this.source)
  }

  public subscribe(subscriber: IWebsitePlayerProgressBar) {
    if (this.progressBars[subscriber.id]) throw new Error('Clock: Duplicate subscriber id: ' + subscriber.id)
    this.progressBars[subscriber.id] = subscriber
  }

  public unsubscribe({ id }: IWebsitePlayerProgressBar) {
    delete this.progressBars[id]
  }
}

export default WebsitePlayer
