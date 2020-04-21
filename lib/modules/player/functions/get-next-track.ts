import { ITrack } from '../index'

function getNextTrack(state: any): ITrack {
  const { currentTrackId, playlist }: { currentTrackId: string, playlist: ITrack[] } = state.player
  const currentPlaylistIndex = playlist.findIndex(track => track.id === currentTrackId)
  const nextPlaylistIndex = (
    currentPlaylistIndex < playlist.length - 1
      ? currentPlaylistIndex + 1
      : 0
  )

  return playlist[nextPlaylistIndex]
}

export default getNextTrack
