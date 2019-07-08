import React, { ReactElement } from 'react'
import { Waveform } from '../waveform'
import { EditForm } from '../edit-form'
import './style.css'

interface IProps {
  mainWidth: number
}

function Edit({ mainWidth }: IProps): ReactElement {
  return (
    <div className="edit">
      <Waveform width={mainWidth} />
      <EditForm />
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
