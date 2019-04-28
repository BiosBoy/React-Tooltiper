export interface IArrow {
  addArrow: boolean
}

export interface ICloseButton {
  active: boolean
  buttonStyles?: string
  buttonChildren?: string | number
  actionOnClose?: () => void
}

export interface IAnimation {
  className?: string
  timeExit?: number
  timeIn?: number
}

export interface IOverrideStyles {
  button?: string
  wrap?: string
  container?: string
  arrowWrap?: string
  tooltipArrow?: string
  title?: string
}

export interface IParent {
  active?: boolean
  ID: string
}

export interface ICoords {
  active?: boolean
  left?: string
  top?: string
}

export interface IPosition {
  x: string
  y: string
}

export interface IManualCoordsFix {
  fixX?: number
  fixY?: number
}

export interface ITooltips {
  ID: string
  child: string | number | Element | HTMLElement
}

export interface IProps extends IArrow {
  position?: IPosition
  customCoords?: ICoords
  manualCoodsFix?: IManualCoordsFix
  closeButton?: ICloseButton
  animProps?: IAnimation
  overrideStyles?: IOverrideStyles
  actionOnEntered?: () => void
  actionOnExited?: () => void
}

export interface IState {
  showTooltip: boolean
  tooltip: ITooltips
  tooltipNode: any
  parentNode: any
}
