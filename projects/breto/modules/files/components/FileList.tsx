import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FileListHeader, getFileNameFromPath } from '../'
import { RootState } from '../../../index'

function FileList(): ReactElement {
  const { files } = useSelector((state: RootState) => ({
    files: state.files.files,
  }))

  return (
    <div className="file-list">
      <header>
        <FileListHeader />
      </header>
      <ul>
        { files.map(filePath => (
          <li key={filePath}>
            { getFileNameFromPath(filePath) }
            <div className="file-actions">
              <button>Preview</button>
              <button>Remove</button>
              <button>Create Clip -&gt;</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FileList
