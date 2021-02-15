/**
 * The Tilt component.
 */
import {debounce, each} from 'lodash'
import React, { ReactElement } from 'react'

import './tilt.scss'

export interface ITiltOpts {
  amount?: number
  skew?: number
  compensate?: boolean
  both?: boolean
  untilt?: boolean
}

export interface IProps {
  id?: string
  onRender?: any
  allowRedraw?: boolean
}

export interface ITiltState {
  data: any
}

export default class extends React.Component<ITiltProps, ITiltState> {
  public static defaultProps: ITiltProps = {
    amount: 1,
    skew: 1.5,
    className: '',
    compensate: true,
    id: '',
    both: false,
    allowRedraw: true,
  }

  private dom: any
  private tilt: number
  private debouncedRenderEffect: any = debounce(this.renderEffect, 200)

  constructor(props: ITiltProps) {
    super(props)
  }

  public componentWillReceiveProps() {
    if (this.props.allowRedraw) {
      this.debouncedRenderEffect()
      this.forceUpdate()
    }
  }

  public shouldComponentUpdate() {
    return false
  }

  public render() {
    return (
      <div
        className={`kas-tilt ${this.props.className || ''}`}
        ref={el => {
          this.getDom(el)
        }}
      >
        <div className="kas-tilt--tiltor">
          <div className="kas-tilt--compensator">{this.props.children}</div>
        </div>
      </div>
    )
  }

  private getDom(el) {
    this.dom = el
    this.renderEffect()
  }

  private renderEffect() {
    if (!this.dom) {
      return
    }

    const tiltor = this.dom.querySelector('.kas-tilt--tiltor')
    const compensator = this.dom.querySelector('.kas-tilt--compensator')
    const dimensions = {
      height: `${this.dom.getBoundingClientRect().height}px`,
      width: `${this.dom.getBoundingClientRect().width}px`,
    }

    const tilt = this.props.both
      ? Math.random() * this.props.amount * 2 - this.props.amount
      : Math.random() * this.props.amount

    const skewX = this.props.both
      ? Math.random() * this.props.skew * 2 - this.props.skew
      : Math.random() * this.props.skew

    const skewY = this.props.both
      ? Math.random() * this.props.skew * 2 - this.props.skew
      : Math.random() * this.props.skew

    // tiltor.style.width = dimensions.width
    // tiltor.style.height = dimensions.height
    tiltor.style.transform = `
      rotate(${tilt}deg)
       skewX(${skewX}deg)
       skewY(${skewY}deg)
    `

    // compensator.style.width = dimensions.width
    // compensator.style.height = dimensions.height
    compensator.style.transform = this.props.compensate
      ? `
        rotate(${tilt * -1}deg)
          skewX(${skewX * -1}deg)
          skewY(${skewY * -1}deg)`
      : null

    if (this.props.onRender) {
      this.props.onRender(true)
    }
  }

  private wrapLetters(text) {
    return text
      .split('')
      .map(c => `<span class="kas-tilt--jiggly">${c}</span>`)
      .join('')
  }

  private ghostLetters(el) {
    each(el.querySelectorAll('.kas-tilt--jiggly'), (jiggly, i) => {
      const ghosty = document.createElement('span')
      ghosty.innerText = jiggly.innerText
      ghosty.className = 'kas-tilt--ghosty'
      jiggly.append(ghosty)
    })
  }
}
