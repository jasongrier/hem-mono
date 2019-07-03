import React, { ReactElement } from 'react'
import { Waveform } from '../waveform'
import './style.css'

interface IProps {
  mainWidth: number
}

function Edit({ mainWidth }: IProps): ReactElement {
  return (
    <div className="edit">
      <Waveform width={mainWidth} />
      <div className="edit-form">
        <form>
          <input type="text" />
          <textarea></textarea>
          <textarea className="tags"></textarea>
        </form>
      </div>
      <div className="clip-list">
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line active">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
        <div className="clip-line">Lorem ipsum dolor sit amet</div>
      </div>
    </div>
  )
}

export default Edit
