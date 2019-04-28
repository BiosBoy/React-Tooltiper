const initialState = {
  addArrow: true,
  arrowStyles: 'tooltipArrow',
  arrowWrapStyles: 'arrowWrap'
}

export const disabled = {
  ...initialState,
  addArrow: false
}

export const rotatedArrow = {
  ...initialState,
  arrowRotate: {
    coordX: 'center',
    coordY: 'bottom'
  }
}

export default initialState
