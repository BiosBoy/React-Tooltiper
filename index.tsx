import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import { tooltipSubscriber, throttler } from './utils'
import { getCoordsShift, getTransformShift, classNamesHolder, defaultProps } from './helpers'

import { Arrow, CloseButton } from './components'

import { IProps, IState, ITooltips } from './types'
import {
  ROOT_NODE,
  ALLOW_EVENTS,
  DISABLE_EVENTS,
  TOP,
  LEFT,
  BOTTOM,
  RIGHT,
  CENTER,
  DEFAULT_ANIM_PROPS
} from './constants'

import './styles/anim.scss'

class ToolTip extends React.Component<IProps, IState> {
  static defaultProps: IProps = defaultProps
  private _ref: React.RefObject<HTMLInputElement>

  constructor(props: IProps) {
    super(props)

    this.state = {
      showTooltip: false,
      tooltipNode: null,
      parentNode: null,
      tooltip: {
        ID: null,
        child: ''
      }
    }

    this._ref = React.createRef()
  }

  componentDidMount() {
    document.body.addEventListener('mouseover', this._tooltipsObserver)
    throttler({ event: 'resize', callback: this._hideTooltip })

    tooltipSubscriber.addAction(this._updateActiveTooltip)
  }

  componentWillUnmount() {
    document.body.removeEventListener('mouseover', this._tooltipsObserver)
    window.removeEventListener('resize', this._hideTooltip)
  }

  _toltipNotPermitted = nodeID => ((nodeID === null || !nodeID) && !this._isButtonThrowed()) || false

  _findTargetNode = e => {
    const nodeRef = e.target
    const nodeID = nodeRef.getAttribute('id')

    if (this._toltipNotPermitted(nodeID)) {
      this._hideTooltip()

      return null
    }

    return {
      nodeRef,
      nodeID
    }
  }

  _tooltipsObserver = e => {
    const tooltips: ITooltips[] = tooltipSubscriber.getTargets()
    const { nodeRef = null, nodeID = null } = this._findTargetNode(e) || {}
    const tooltip = tooltips.find(tooltip => nodeID === tooltip.ID)

    if (!tooltip) return

    this._showTooltip(nodeRef, tooltip)
    this._checkTooltipUnderCell()
  }

  _updateActiveTooltip = nextTooltips => {
    const { tooltip: currentTooltip } = this.state

    // watching new data updates once tooltip is showed
    const newTooltip = nextTooltips.find((incomingTooltip: any) => {
      const targetMatch = incomingTooltip.ID === currentTooltip.ID
      const childsNotEqual = incomingTooltip.child !== currentTooltip.child

      if (targetMatch && childsNotEqual) {
        return incomingTooltip
      }

      return null
    })

    this.setState(prevState => ({
      ...prevState,
      tooltip: newTooltip || prevState.tooltip
    }))
  }

  _getTooltipNode = () => ReactDOM.findDOMNode(this)

  _setTooltipeNode = () => {
    this.setState({
      tooltipNode: this._getTooltipNode()
    })
  }

  _showTooltip = (nodeRef, tooltip) => {
    this.setState({
      tooltip,
      showTooltip: true,
      parentNode: nodeRef,
      tooltipNode: this._getTooltipNode()
    })
  }

  _hideTooltip = () => this.setState({ showTooltip: false })

  _getClientNodesRects = () => {
    const { tooltipNode, parentNode } = this.state

    const parentRects = (parentNode && parentNode.getBoundingClientRect && parentNode.getBoundingClientRect()) || {}
    const tooltipRects = (tooltipNode && tooltipNode.getBoundingClientRect && tooltipNode.getBoundingClientRect()) || {}

    return {
      parentRects,
      tooltipRects
    }
  }

  _checkTooltipUnderCell = () => {
    const { tooltipNode } = this.state
    const {
      position: { y: coordY }
    } = this.props

    const { parentRects, tooltipRects } = this._getClientNodesRects()

    const { height = 0, top = 0, bottom = 0 } = tooltipRects
    const { height: parentHeight = 0 } = parentRects

    const tooltipSettedFromTopToBottom = coordY === BOTTOM && top < parentHeight + height
    const tooltipSettedFromBottomToTop = coordY === TOP && innerHeight - bottom + height < parentHeight + height
    const shiftAlreadySetted = tooltipSettedFromTopToBottom || tooltipSettedFromBottomToTop

    const topYOffset = height > top
    const bottomYOffset = coordY === BOTTOM && bottom > innerHeight

    if (!tooltipNode) return

    this.setState(prevState => ({
      ...prevState,
      coordY: shiftAlreadySetted ? coordY : topYOffset ? BOTTOM : bottomYOffset ? TOP : coordY
    }))
  }

  _calculatePositions = () => {
    const {
      position: { x: coordX, y: coordY }
    } = this.props

    const { parentRects, tooltipRects } = this._getClientNodesRects()

    const { top = 0, bottom = 0, left = 0, right = 0, height = 0, width = 0 } = parentRects || {}
    const { height: tooltipHeight = 0, width: tooltipWidth = 0 } = tooltipRects || {}

    const restProps = () => {
      const propsX = {
        left: {
          parentLeft: left,
          tooltipWidth
        },
        center: {
          parentLeft: left,
          parentWidth: width
        },
        right: {
          parentRight: right
        }
      }

      const propsY = {
        top: {
          parentTop: top,
          tooltipHeight
        },
        center: {
          parentTop: top,
          parentHeight: height,
          tooltipHeight
        },
        bottom: {
          parentBottom: bottom
        }
      }

      return {
        x: propsX[coordX],
        y: propsY[coordY]
      }
    }

    return {
      coordX,
      coordY,
      restProps: restProps()
    }
  }

  _getCoordsFix = () => {
    const { manualCoodsFix } = this.props

    const { fixX = 0, fixY = 0 } = manualCoodsFix || {}

    return {
      fixX,
      fixY
    }
  }

  _calculateCoords = () => {
    const {
      position: { x: coordX, y: coordY }
    } = this.props

    const { restProps } = this._calculatePositions()
    const { trasformX, trasformY } = getTransformShift(coordX, coordY)
    const { left: leftCoord, top: topCoord } = getCoordsShift(coordX, coordY, restProps)
    const { fixX, fixY } = this._getCoordsFix()

    return {
      top: topCoord + fixX,
      left: leftCoord + fixY,
      transform: `translate(${trasformX}, ${trasformY})`
    }
  }

  _getCoords = () => {
    const {
      customCoords: { active, top, left }
    } = this.props

    if (!active) {
      return this._calculateCoords()
    }

    return {
      top,
      left
    }
  }

  _isButtonThrowed = () => {
    const { closeButton = { active: false } } = this.props

    if (!closeButton.active) {
      return false
    }

    return true
  }

  _animEnter = () => this._setTooltipeNode()

  _animEntered = () => {
    const { actionOnEntered } = this.props

    actionOnEntered && actionOnEntered()
  }

  _animFinished = () => {
    const { actionOnExited } = this.props

    actionOnExited && actionOnExited()
  }

  _getPointerEvents = isButtonThrowed => (isButtonThrowed ? ALLOW_EVENTS : DISABLE_EVENTS)

  _getWrapperStyles = () => {
    const {
      position: { x: coordX }
    } = this.props
    const isButonThrowed = this._isButtonThrowed()
    const customCoords = this._getCoords()
    const customOrientation = coordX === CENTER ? 'column' : 'row'

    return {
      pointerEvents: this._getPointerEvents(isButonThrowed),
      flexDirection: customOrientation,
      ...customCoords
    }
  }

  _getBodyElementQueie = (body, arrow) => {
    const {
      position: { x: coordX, y: coordY }
    } = this.props

    const arrowFirst = coordX === RIGHT || (coordX !== LEFT && coordY === BOTTOM)
    const tooltipBody = arrowFirst ? [arrow(), body()] : [body(), arrow()]

    return tooltipBody
  }

  _hideByClick = () => {
    const {
      closeButton: { actionOnClose }
    } = this.props

    if (actionOnClose) {
      actionOnClose()
    }

    this._hideTooltip()
  }

  _renderToolTip() {
    const {
      tooltip: { child, ID }
    } = this.state
    const {
      overrideStyles,
      closeButton,
      addArrow,
      position: { x: coordX, y: coordY }
    } = this.props

    const { wrapStyles, containerStyles, titleStyles, arrowWrapStyles, arrowStyles, buttonStyles } = classNamesHolder(
      overrideStyles
    )

    const body = () => (
      <div key={1} className={containerStyles}>
        <CloseButton
          active={closeButton.active}
          buttonStyles={buttonStyles}
          buttonChildren={closeButton.buttonChildren}
          clickAction={this._hideByClick}
        />
        <span className={titleStyles}>{child}</span>
      </div>
    )

    const arrow = () => (
      <Arrow
        key={2}
        addArrow={addArrow}
        arrowWrapStyles={arrowWrapStyles}
        arrowStyles={arrowStyles}
        arrowRotate={{ coordX, coordY }}
      />
    )

    const tooltipBody = this._getBodyElementQueie(body, arrow)

    return (
      <div
        id={`${ROOT_NODE}${ID}`}
        ref={this._ref}
        className={wrapStyles}
        // @ts-ignore: strange error in styles processing
        style={this._getWrapperStyles()}
      >
        {tooltipBody}
      </div>
    )
  }

  _renderAnimatedTooltip = () => {
    const { showTooltip } = this.state
    const { animProps } = this.props
    const { className = 'tooltip', timeExit = 1000, timeIn = 0 } = animProps || DEFAULT_ANIM_PROPS

    return (
      <CSSTransition
        in={showTooltip}
        classNames={className}
        timeout={{ enter: timeIn, exit: timeExit }}
        onEnter={() => this._animEnter()}
        onEntered={() => this._animEntered()}
        onExited={() => this._animFinished()}
        unmountOnExit={true}
      >
        {this._renderToolTip()}
      </CSSTransition>
    )
  }

  render() {
    const tooltipDOM = this._renderAnimatedTooltip()

    return ReactDOM.createPortal(tooltipDOM, document.body)
  }
}

export default ToolTip
