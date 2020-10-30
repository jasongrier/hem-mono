import React, { ReactElement, SyntheticEvent, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { find, map } from 'lodash'
import { addFile } from '../actions'
import { RootState } from '../../../index'

function FileListHeader(): ReactElement {
  const { files } = useSelector((state: RootState) => ({
    files: state.files.files,
  }))

  const dispatch = useDispatch()

  const importOnClick = useCallback(
    function importOnClickFn(evt: any) {
      evt.preventDefault()

      const file = evt.target.files[0]

      if (find(files, { name: file.name })) {
        alert('A file with that name is already in the file list.')
      }

      const audioEl = document.getElementById('audio-scanner') as HTMLAudioElement

      audioEl.src = URL.createObjectURL(file)
      evt.target.value = null

      dispatch(addFile(file))
    }, [files],
  )

  return (
    <div className="file-list-header">
      {/* <button onClick={importOnClick}>Import...</button> */}
      <input
        multiple={false}
        onChange={importOnClick}
        type="file"
      />
      <audio controls id="audio-scanner" />
    </div>
  )
}

export default FileListHeader
