import React, { ReactElement, useEffect, useState, useCallback } from 'react'

interface IProps {
  onUpload: (file: File) => void
}

function FileUploader({ onUpload }: IProps): ReactElement {
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    document.body.addEventListener('dragenter', onBodyDragEnter)
    document.body.addEventListener('mouseleave', onBodyMouseLeave)

    return function cleanup() {
      document.body.removeEventListener('dragenter', onBodyDragEnter)
      document.body.removeEventListener('mouseleave', onBodyMouseLeave)
    }
  }, [])

  function onBodyDragEnter() {
    !dragging && setDragging(true)
  }

  function onBodyMouseLeave() {
    setDragging(false)
  }

  const onDragOver = useCallback(
    function onDragOver(evt: any) {
      evt.stopPropagation()
      evt.preventDefault()
    }, [],
  )

  const onDrop = useCallback(
    function onDrop(evt: any) {
      evt.stopPropagation()
      evt.preventDefault()
      setDragging(false)
      onUpload(evt.dataTransfer.files[0])
    }, [],
  )

  const onFileInputChanged = useCallback(
    function onFileInputChanged(evt: any) {
      onUpload(evt.target.files[0])
      evt.target.value = null
    }, [],
  )

  const style = `
    .hem-file-uploader {
      display: flex;
      position: relative;
      width: 400px;
      height: 200px;
      border-radius: 3px;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      text-align: center;
      cursor: pointer;
      border: 5px dashed #ccc;
    }

    .hem-file-uploader-input {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 400px;
      height: 200px;
      opacity: 0;
      background: blue;
    }

    .hem-file-uploader-overlay {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9999;
      width: 400px;
      height: 200px;
      opacity: 0;
      transition: opacity 250ms;
      background: #ccc;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }

    .hem-file-uploader-overlay-dragging {
      opacity: 1;
    }

    .hem-file-uploader-overlay * {
      pointer-events: none;
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div
        className="hem-file-uploader"
        draggable={true}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <span>Drop file or click here</span>
        <input
          className="hem-file-uploader-input"
          multiple={false}
          onChange={onFileInputChanged}
          type="file"
        />
        <div
          className={`
            hem-file-uploader-overlay
            ${dragging ? 'hem-file-uploader-overlay-dragging' : ''}
          `}
        >
          <span>Drop it here!</span>
        </div>
      </div>
    </>
  )
}

export default FileUploader
