import { ITrack } from '../index'

function getPreviousTrack(state: any): ITrack {
  const { currentTrackId, playlist }: { currentTrackId: string, playlist: ITrack[] } = state.player
  const currentPlaylistIndex = playlist.findIndex(track => track.id === currentTrackId)
  const nextPlaylistIndex = (
    currentPlaylistIndex > 0
      ? currentPlaylistIndex - 1
      : playlist.length - 1
  )

  return playlist[nextPlaylistIndex]
}

export default getPreviousTrack
