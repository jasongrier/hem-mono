/**
 * The Dot component.
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
import '../styles/dot.scss'

// ================================================================================
// Model
// ================================================================================
interface IProps extends IDefaultProps {
  flashSpeed: number
  armed: boolean
}

interface IState {
  flashing: boolean,
}

const defaultProps: Partial<IProps> = {
  flashSpeed: 200,
  armed: false,
}

const initialState: IState = {
  flashing: false,
}

// ================================================================================
// Decorate
// ================================================================================
// N/A

// ================================================================================
// Init
// ================================================================================
class Dot extends React.Component<IProps, IState> {

  public static defaultProps: Partial<IProps> = defaultProps

  public state: IState = initialState

// ================================================================================
// Lifecycle
// ================================================================================
  public componentDidMount() {

  }

  public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return diffComponent(['flashing', 'armed'], this, nextProps, nextState)
  }

  public componentDidUpdate() {

  }

  public componentWillUnmount() {

  }

// ================================================================================
// Render
// ================================================================================
  public render() {
    const {armed, flashSpeed, children, id} = this.props
    const {flashing} = this.state

    return (
      // @ts-ignore
      <div className={`
          dot
          ${armed ? 'armed' : null}
          ${flashing ? 'flashing' : null}
        `}
        style={{
          transition: `all ${flashSpeed / 2} ease-in`
        }}
      >
        {children}
      </div>
    )
  }

// ================================================================================
// Handlers
// ================================================================================
  public flash = () => {
    const {armed, flashSpeed, id} = this.props
    if (armed) {
      this.setState({flashing: true})
      // @ts-ignore
      document.querySelector(`div[data-uid="c--${id}"]`).classList.add('flashing')
      setTimeout(() => {
        this.setState({flashing: false})
        // @ts-ignore
        document.querySelector(`div[data-uid="c--${id}"]`).classList.remove('flashing')
      }, flashSpeed)
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
export {Dot}