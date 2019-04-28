import { ICloseButton } from '../../../types'

export interface IProps extends ICloseButton {
  clickAction?: () => void
}
