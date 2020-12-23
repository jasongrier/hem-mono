import React, { ReactElement, useState } from 'react'

function WebMovie(): ReactElement {
  const [currentFolder, setCurrentFolder] = useState<number>(1)
  const [currentFrame, setCurrentFrame] = useState<number>(0)

  return (
    <div className="hem-web-movie">
      <div className="hem-web-movie-screen">

      </div>
    </div>
  )
}

export default WebMovie
