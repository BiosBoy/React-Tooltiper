import { TOP, CENTER } from '../constants'

const defaultProps = {
  addArrow: true,
  position: {
    x: CENTER,
    y: TOP
  },
  customCoords: {
    active: false,
    top: '',
    left: ''
  },
  closeButton: {
    active: false,
    buttonChildren: '',
    actionOnClose: () => {}
  },
  animProps: {
    className: 'tooltip',
    timeExit: 1000,
    timeIn: 30
  },
  overrideStyles: {
    button: '',
    wrap: '',
    container: '',
    arrowWrap: '',
    tooltipArrow: '',
    title: ''
  },
  actionOnEntered: () => {},
  actionOnExit: () => {}
}

export default defaultProps
