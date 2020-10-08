import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFolder } from '../'
import { RootState } from '../../../index'

function FileListHeader(): ReactElement {
  const dispatch = useDispatch()

  const importOnClick = useCallback(
    function importOnClickFn() {
      dispatch(addFolder())
    }, [],
  )

  return (
    <div className="file-list-header">
      <button onClick={importOnClick}>Import...</button>
    </div>
  )
}

export default FileListHeader
