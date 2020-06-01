/**
 * The Slider Component
 */

// ================================================================================
// Imports: External
// ================================================================================
import * as React from 'react'
import * as classnames from 'classnames'

// ================================================================================
// Imports: Framework
// ================================================================================
import {IDefaultProps} from '../interfaces'
import {diffComponent} from '../helpers/browser'

// ================================================================================
// Imports: Project
// ================================================================================
import {coords} from '../helpers/browser'

// ================================================================================
// Imports: Component
// ================================================================================
import './Slider.css'

// ================================================================================
// Model
// ================================================================================
interface IProps extends IDefaultProps {
  id: string
  value?: number
  default?: number
  direction?: 'vertical' | 'horizontal'
  onBeforeChange?: (value: number) => void
  onChange?: (value: number) => void
  onAfterChange?: (value: number) => void
  detentFormula?: (value: number) => number
}

interface IState {
  pressed: boolean
}

const defaultProps: Partial<IProps> = {
  default: 0,
  direction: 'vertical',
}

const initialState: IState = {
  pressed: false,
}

// ================================================================================
// Init
// ================================================================================
class Slider extends React.Component<IProps, IState> {

  public static defaultProps: Partial<IProps> = defaultProps

  public state: IState = initialState

  private el: HTMLDivElement

// ================================================================================
// Lifecycle
// ================================================================================
  public componentDidMount() {
    const {id} = this.props
    window[`slider-${id}-dragging`] = false
    window.addEventListener('mouseup', this.onMouseUp)
    window.addEventListener('mousemove', this.onMouseMove)
  }

  public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return diffComponent(['value', 'pressed'], this, nextProps, nextState)
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {

  }

  public componentWillUnmount() {
    delete window[`slider-${this.props.id}-dragging`]
    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
  }

// ================================================================================
// Render
// ================================================================================
  public render() {
    const {id, className, direction} = this.props
    const {pressed} = this.state

    return (
      <div id={id}
        className={`
          pro-slider
          ${direction}
          ${className}
          ${pressed ? 'pressed' : null}
      `}
        onMouseDown={this.onMouseDown}
        ref={(el: HTMLDivElement) => this.el = el}
      >
        <div className='pro-slider__amount' style={this.amountStyle()}>
          <div className='pro-slider__handle'></div>
        </div>
      </div>
    )
  }

// ================================================================================
// Custom Methods
// ================================================================================
  private onMouseDown = (evt) => {
    const {id, default: defaultValue, onChange, onBeforeChange} = this.props

    if (evt.metaKey) {
      onBeforeChange && onBeforeChange(defaultValue)
      onChange(defaultValue)
    }

    else {
      window[`slider-${id}-dragging`] = true
      document.body.classList.add('pro-slider-unselectable')
      this.setState({pressed: true})
      const val = this.getValue(evt)
      onBeforeChange && onBeforeChange(val)
      onChange(val)
    }
  }

  private onMouseMove = (evt) => {
    const {id, onChange} = this.props
    if (window[`slider-${id}-dragging`] === true) {
      const val = this.getValue(evt)
      onChange(val)
    }
  }

  private onMouseUp = (evt) => {
    const {id, onAfterChange} = this.props
    if (window[`slider-${id}-dragging`] === true) {
      window[`slider-${id}-dragging`] = false
      document.body.classList.remove('pro-slider-unselectable')
      this.setState({pressed: false})
      onAfterChange && onAfterChange(this.getValue(evt))
    }
  }

  private getValue = (evt) => {
    const {direction, detentFormula} = this.props
    const mouseCoordinates = coords(evt, this.el)
    const rawValue = direction === 'horizontal' ? mouseCoordinates.x : mouseCoordinates.y
    return detentFormula ? detentFormula(rawValue) : rawValue
  }

  private amountStyle = () => {
    const {value, direction} = this.props
    const percent = value * 100
    return direction === 'horizontal' ? {width: percent + '%'} : {height: percent + '%'}
  }
}

// ================================================================================
// Exports
// ================================================================================
export {Slider}
