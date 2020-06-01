/**
 * The Canvas component.
 */

// ================================================================================
// External
// ================================================================================
import {find} from 'lodash'
import * as classnames from 'classnames'
import * as React from 'react'
const {ipcRenderer} = window['require']('electron')

// ================================================================================
// Framework
// ================================================================================
import {IDefaultProps} from '../interfaces'
import {diffComponent} from '../helpers/browser'

// ================================================================================
// Project
// ================================================================================
import {Dot} from './Dot'

// ================================================================================
// Component
// ================================================================================
// N/A

// ================================================================================
// Style
// ================================================================================
import '../styles/canvas.scss'

// ================================================================================
// Model
// ================================================================================
enum drawModes {
  ERASE,
  DRAW,
}

interface IProps extends IDefaultProps {
  dots: boolean[]
  setDot: (id: any, active: any) => void
}

interface IState {
  dragging: boolean
  drawMode: drawModes
}

const defaultProps: Partial<IProps> = {
  dots: [],
}

const initialState: IState = {
  dragging: false,
  drawMode: drawModes.DRAW,
}

// ================================================================================
// Decorate
// ================================================================================
// N/A

// ================================================================================
// Init
// ================================================================================
class Canvas extends React.Component<IProps, IState> {

  public static defaultProps: Partial<IProps> = defaultProps

  public state: IState = initialState

  private dotInstances: Dot[] = []

// ================================================================================
// Lifecycle
// ================================================================================
  public componentDidMount() {
    ipcRenderer.on('flashDot', this.flashDot)
  }

  public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return diffComponent(['dots', 'className', 'activeBoardId'], this, nextProps, nextState)
  }

  public componentDidUpdate(prevProps: IProps) {
  }

  public componentWillUnmount() {

  }

// ================================================================================
// Render
// ================================================================================
  public render() {
    const {className} = this.props

    return (
      // @ts-ignore
      <div className={`
        canvas
        ${className}
      `}>
        {this.rows()}
      </div>
    )
  }

// ================================================================================
// Handlers
// ================================================================================
  private onMouseDownDot = (id: number) => () => {
    const {dots, setDot} = this.props

    if (!setDot) {
      return
    }

    const active = dots[id]

    this.setState({
      dragging: true,
      drawMode: active ? drawModes.ERASE : drawModes.DRAW,
    })

    setDot(id, !active)
  }

  private onMouseOverDot = (id: number) => () => {
    const {setDot} = this.props

    if (!setDot) {
      return
    }

    const {dragging, drawMode} = this.state

    dragging && setDot(id, drawMode === drawModes.DRAW ? true : false)
  }

  private onMouseUpDot = () => {

    if (!this.props.setDot) {
      return
    }

    this.setState({
      dragging: false,
    })
  }

// ================================================================================
// Custom Methods
// ================================================================================
  private rows = () => {
    const {dots} = this.props
    const size = Math.sqrt(Object.keys(dots).length)

    const rows = []
    for (let r = 0; r < size; r ++) {
      rows.push(
        <div key={r}
          className='row'>
          {this.cols(r)}
        </div>
      )
    }

    return rows
  }

  private cols = (row: any) => {
    const {dots} = this.props
    const size = Math.sqrt(Object.keys(dots).length)
    const dotEls = []

    for (let c = 0; c < size; c ++) {
      const id = row * size + c

      dotEls.push(
        <Dot key={id}
          id={id}
          armed={dots[id]}
          flashSpeed={200}
          // @ts-ignore
          ref={ref => this.addDotInstance(ref)}
        >
          <div className='dot-trigger'
            onMouseDown={this.onMouseDownDot(id)}
            onMouseOver={this.onMouseOverDot(id)}
            onMouseUp={this.onMouseUpDot}
          />
        </Dot>
      )
    }

    return dotEls
  }

  private flashDot = (evt: any, id: any) => this.dotInstances[id].flash()

  private addDotInstance = (ref: Dot) => {
    if (!ref) {
      return
    }

    if (
      this.dotInstances.length === 0 ||
      (this.dotInstances.length > 0 && !find(this.dotInstances, dot => dot.props.id === ref.props.id))
    ) {
      this.dotInstances.push(ref)
    }
  }
}

// ================================================================================
// Export
// ================================================================================
export {Canvas}