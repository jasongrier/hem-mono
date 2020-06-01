/**
 * The Seurat component.
 */

// ================================================================================
// External
// ================================================================================
import {fill, clone} from 'lodash'
import * as React from 'react'
import * as classnames from 'classnames'
import produce from 'immer'
const {ipcRenderer} = window['require']('electron')

// ================================================================================
// Framework
// ================================================================================
import {IDefaultProps} from '../interfaces'
import {diffComponent, getRendererAppUtils} from '../helpers/browser'
import {Slider} from './Slider'

// ================================================================================
// Project
// ================================================================================
import {Canvas} from './Canvas'
import {About} from './About'
import {IBoard, defaultBoardSize} from '../model'
// const {openTextFileFromDialog, saveTextFileAs, onStateChange} = getRendererAppUtils()

// ================================================================================
// Component
// ================================================================================
// N/A

// ================================================================================
// Style
// ================================================================================
import '../styles/seurat.scss'

// ================================================================================
// Model
// ================================================================================
const initialBoard: IBoard = {
  dots: fill(Array(defaultBoardSize), false),
  sequence: 'random',
  size: defaultBoardSize,
  sliders: [1, 1],
  title: 'Untitled Board',
}

interface IProps extends IDefaultProps {}

interface IState {
  aboutOpen: boolean
  board: IBoard
  playing: boolean
}

const defaultProps: Partial<IProps> = {}

const initialState: IState = {
  aboutOpen: false,
  board: initialBoard,
  playing: false,
}

// ================================================================================
// Decorate
// ================================================================================
// N/A

// ================================================================================
// Init
// ================================================================================
class Seurat extends React.Component<IProps, IState> {

  public static defaultProps: Partial<IProps> = defaultProps

  public state: IState = clone(initialState)

// ================================================================================
// Lifecycle
// ================================================================================
  public componentDidMount() {
    ipcRenderer.on('clear', () => this.fillBoard(false))
    ipcRenderer.on('fileOpened', this.open)
    // ipcRenderer.on('fill', this.fillBoard)
    ipcRenderer.on('openAbout', () => this.setState({aboutOpen: true}))
    ipcRenderer.on('openTextFileFromDialog', this.open)
    ipcRenderer.on('save', this.save)
    // ipcRenderer.on('setBoardProp', this.setBoardProp)
    // ipcRenderer.on('setBoardSize', this.setBoardSize)
    // ipcRenderer.on('setPlaying', (playing) => this.setState({playing}))
    // onStateChange(this.state)
  }

  public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return diffComponent(['*'], this, nextProps, nextState)
  }

  public componentDidUpdate() {
    // onStateChange(this.state)
  }

  public componentWillUnmount() {

  }

// ================================================================================
// Render
// ================================================================================
  public render() {
    const {board, aboutOpen, playing} = this.state

    return (
      <div className={`seurat${playing ? ' playing' : ''}`}>
        <About open={aboutOpen}
          close={this.closeAbout}
        />

        <div className='sliders'>
          <Slider id='seurat-slider-0'
            value={board.sliders[0]}
            onChange={this.setSlider(0)}
            detentFormula={this.tempoDetent}
          />
          <Slider id='seurat-slider-1'
            value={board.sliders[1]}
            onChange={this.setSlider(1)}
          />
        </div>

        <Canvas
          dots={board.dots}
          setDot={this.setDot}
        />
      </div>
    )
  }

// ================================================================================
// Handlers
// ================================================================================
  private closeAbout = () => {
    this.setState({aboutOpen: false})
  }

  private setDot = (id: number, active: boolean) => {
    this.setState(produce((draft: IState) => {
      draft.board.dots[id] = active
    }))
  }

  private setSlider = (id: number) => (value) => {
    this.setState(produce((draft: IState) => {
      draft.board.sliders[id] = value
    }))
  }

  private fillBoard = (val: boolean = true) => {
    this.setState(produce((draft: IState) => {
      draft.board.dots.fill(val)
    }))
  }

  private save = () => {
    // saveTextFileAs(this.state.board)
  }

  private open = async (evt, {data, path}: {data: IBoard, path: string}) => {
    data.title = path.split('/').pop().replace('.seu', '')
    this.setState({board: data})
  }

  private setBoardProp = (key: string, value: any) => (evt: React.MouseEvent<any>) => {
    this.setState(produce((draft: IState) => {
      draft.board[key] = value
    }))
  }

// ================================================================================
// Custom Methods
// ================================================================================
  private setBoardSize = async (size: number) => {
    this.setState(produce((draft: IState) => {
      draft.board.size = size
      draft.board.dots = fill(Array(size), false)
    }))
  }

  private openTextFileFromDialog = () => {
    // openTextFileFromDialog([{name: 'seu', extensions: ['seu']}])
  }

  private tempoDetent = (value) => {
    return (Math.round(value * 13)) / 13
  }
}

// ================================================================================
// Export
// ================================================================================
export {Seurat, initialState}