/**
 * The About component.
 */

// ================================================================================
// External
// ================================================================================
import * as React from 'react'
import * as classnames from 'classnames'

// ================================================================================
// Framework
// ================================================================================
import {IDefaultProps} from '../interfaces'
import {diffComponent} from '../helpers/browser'

// ================================================================================
// Project
// ================================================================================
// N/A

// ================================================================================
// Component
// ================================================================================
// N/A

// ================================================================================
// Style
// ================================================================================
import '../styles/about.scss'

// ================================================================================
// Model
// ================================================================================
interface IProps extends IDefaultProps {
  open: boolean
  close: () => void
}

interface IState {}

const defaultProps: Partial<IProps> = {}
const initialState: IState = {}

// ================================================================================
// Decorate
// ================================================================================
// N/A

// ================================================================================
// Init
// ================================================================================
class About extends React.Component<IProps, IState> {

  public static defaultProps: Partial<IProps> = defaultProps

  public state: IState = initialState

// ================================================================================
// Lifecycle
// ================================================================================
  public componentDidMount() {
    document.body.addEventListener('keydown', this.onKeyDown)
  }

  public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return diffComponent(['open'], this, nextProps, nextState)
  }

  public componentDidUpdate() {

  }

  public componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onKeyDown)
  }

// ================================================================================
// Render
// ================================================================================
  public render() {
    const {open, close} = this.props

    return (
      <div className={`
        about
        ${open ? 'open' : null}
      `}
        onClick={close}
      >
        <div className='logo'>
          <img src={require('../public/images/SEU_LOGO.png')} />
        </div>
        <div className='title'>
          SEURAT Pattern Maker<sup>&tm;</sup>
        </div>
        <div className='info'>
          Version 0.0.1 (beta)<br />
          &copy; 2018–2019 HEM (Human Ear Music), Jason Grier<br />
          Authorized for: Beta User{'<j@hem.rocks>'}
        </div>
        <div className='pro-logo'>HEM</div>
      </div>
    )
  }

// ================================================================================
// Handlers
// ================================================================================
  private onKeyDown = ({keyCode}) => {
    const {open, close} = this.props

    if (keyCode === 27 && open) {
      close()
    }
  }

// ================================================================================
// Helpers
// ================================================================================
// N/A
}

// ================================================================================
// Export
// ================================================================================
export {About}