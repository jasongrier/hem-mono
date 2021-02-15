import React, { ReactElement, useState } from 'react'

function HeaderPlayer(): ReactElement {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={`
      header-player
      ${ open ? 'header-player-open' : '' }
    `}>
      { !open && (
        <button
          className="header-player-control header-player-control-open fas fa-volume-up"
          onClick={() => setOpen(true)}
        />
      )}
      <button
        className="header-player-control header-player-control-close fas fa-times"
        onClick={() => setOpen(false)}
      />
      <div className="header-player-progress-track">
        <div className="header-player-progress-bar" />
      </div>
    </div>
  )
}

export default HeaderPlayer
