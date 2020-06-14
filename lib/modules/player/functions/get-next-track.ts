import { IState, ITrack } from '../index'

function getNextTrack(state: any, previous = false): ITrack | undefined {
  const playerState: IState = state.player
  const { currentTrack, currentPlaylist } = playerState

  if (!currentTrack) return
  if (!currentPlaylist) return

  const currentPlaylistIndex = currentPlaylist.tracks.findIndex(track => track.id === currentTrack.id)

  if (currentPlaylistIndex === -1) {
    return currentPlaylist.tracks[0]
  }

  else {
    if (previous) {
      const previousPlaylistIndex = (
        currentPlaylistIndex > 0
          ? currentPlaylistIndex - 1
          : currentPlaylist.tracks.length - 1
      )

      return currentPlaylist.tracks[previousPlaylistIndex]
    }

    else {
      const nextPlaylistIndex = (
        currentPlaylistIndex < currentPlaylist.tracks.length - 1
          ? currentPlaylistIndex + 1
          : 0
      )

      return currentPlaylist.tracks[nextPlaylistIndex]
    }
  }
}

export default getNextTrack
