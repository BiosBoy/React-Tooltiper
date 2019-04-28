const initialState = {
  active: true,
  buttonStyles: 'closeButton',
  clickAction: () => {}
}

export const disabled = {
  ...initialState,
  active: false
}

export default initialState
