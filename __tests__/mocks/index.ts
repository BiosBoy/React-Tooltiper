const initialState = {
  addArrow: true,
  position: {
    x: 'center',
    y: 'top'
  }
}

export const withoutArrow = {
  ...initialState,
  addArrow: false
}

export const closeButton = {
  ...initialState,
  closeButton: {
    active: true,
    buttonChildren: 'XXX'
  }
}

export const positionCoords = {
  ...initialState
}

export const customCoords = {
  ...initialState,
  customCoords: {
    top: '105px',
    left: '20px'
  }
}

export const manualCoodsFix = {
  ...initialState,
  manualCoodsFix: {
    fixX: -2,
    fixY: -3
  }
}

export default initialState
