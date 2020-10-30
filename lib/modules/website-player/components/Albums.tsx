import React, { ReactElement } from 'react'
import Scrollbars from 'react-scrollbars-custom'
import { IAlbum, Album } from '../index'

interface IProps {
  albums: IAlbum[]
}

function Albums({ albums }: IProps): ReactElement {
  return (
    <div className="hem-player-albums">
      <Scrollbars noScrollX={true}>
        {albums.map(album => <Album album={album} />)}
      </Scrollbars>
    </div>
  )
}

export default Albums
