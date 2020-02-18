import React, { ReactElement } from 'react'

function SeuratLogo(): ReactElement {
  const style = `
    .cls-1 {
      fill-rule: evenodd;
    }
  `

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1223"
      height="1223"
      viewBox="0 0 1223 1223"
    >
      <defs>
        <style dangerouslySetInnerHTML={{__html: style}} />
      </defs>
      <path id="SEURAT" className="cls-1" d="M286.5,0C444.73,0,573,128.27,573,286.5S444.73,573,286.5,573,0,444.73,0,286.5,128.27,0,286.5,0Zm650,0C1094.73,0,1223,128.27,1223,286.5S1094.73,573,936.5,573,650,444.73,650,286.5,778.27,0,936.5,0Zm-649,650C445.73,650,574,778.27,574,936.5S445.73,1223,287.5,1223,1,1094.73,1,936.5,129.27,650,287.5,650Z" />
    </svg>

  )
}

export default SeuratLogo