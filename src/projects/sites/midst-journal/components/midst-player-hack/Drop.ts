import React, { createElement as e } from 'react'
import Slider from './Slider'
import appendStyle from './append-style'
import iconFastForward from './icon-fast-forward'

// ================================================================================
// Constructor
// ================================================================================
class Drop extends React.Component {
    static get defaultProps() {
      return {
        label: 'Label',
        open: false,
        controlled: false,
        styleChildren: true,
        onDropToggled: null,
        direction: 'down',
        speed: 0,
      }
    }

    private css: any
    private el: any

    constructor(props: any) {
      super(props)
  // ================================================================================
  // Initial State
  // ================================================================================
    this.state = {
      open: true,
    }

  // ================================================================================
  // Bound Methods
  // ================================================================================
    this.onToggleClicked = this.onToggleClicked.bind(this)
    this.sliderOnChange = this.sliderOnChange.bind(this)

  // ================================================================================
  // Styles
  // ================================================================================
      this.css = () => `
        .drop {
          position: relative;
          width: 100px;
          height: 20px;
          border: 1px solid black;
          box-sizing: border-box;
          font-family: sans-serif;
          font-size: 11px;
          text-align: left;
        }

        .drop__toggle {
          position: absolute;
          width: 98px;
          height: 18px;
          line-height: 20px;
          background: #ccc;
          color: #000;
          cursor: pointer;
        }

        .drop__content {
          display: none;
          position: absolute;
          left: -1px;
          width: 100%;
          height: auto;
          border: 1px solid black;
        }

        .style-children .drop__content div,
        .style-children .drop__content a,
        .style-children .drop__content li{
          width: 98px;
          height: 18px;
          line-height: 20px;
          cursor: pointer;
        }

        .style-children .drop__content div:not(:last-child),
        .style-children .drop__content a:not(:last-child),
        .style-children .drop__content li:not(:last-child) {
          border-bottom: 1px solid black;
        }

        .drop.drop--down .drop__content {
          top: 100%;
        }

        .drop.drop--up .drop__content {
          bottom: 120px;
        }

        .drop.drop--open .drop__content {
          display: block;
        }
      `
  // ================================================================================
  // Class Properties
  // ================================================================================#
      this.el = null
    }

  // ================================================================================
  // Lifecycle
  // ================================================================================#
    componentDidMount() {
      appendStyle(this.css())
    }

  // ================================================================================
  // Handlers
  // ================================================================================
    onToggleClicked(evt: any) {
      evt.stopPropagation()

      if ((this.props as any).onDropToggled) {
        (this.props as any).onDropToggled()
      }

      if (!(this.props as any).controlled) {
        this.setState({ open: !(this.state as any).open })
      }
    }

    sliderOnChange(speed: number) {
      this.setState({speed})
    }

  // ================================================================================
  // Other Methods
  // ================================================================================
  // N/A

  // ================================================================================
  // Render
  // ================================================================================
    render() {
      const { direction, className, label, children, styleChildren, controlled } = this.props as any
      const { speed } = this.state as any
      const open = controlled ? (this.props as any).open : (this.state as any).open

      return (
        e('div', {
          className: 'drop drop--' + direction
            + (open ? ' drop--open' : '')
            + (styleChildren ? ' style-children' : '')
            + (className ? ' ' + className : null),
        },
          e('div', {
            className: 'drop__toggle',
            onClick: this.onToggleClicked,
          }, iconFastForward()),
          e('div', {
            className: 'drop__content',
          },
            e(Slider, {
              id: 'midst-speed-slider',
              hideCursor: false,
              controlled: true,
              stopPropagation: true,
              readOnly: false,
              direction: 'vertical',
              value: speed,
              onChange: this.sliderOnChange,
            })
          ),
        )
      )
    }
  }

  export default Drop
