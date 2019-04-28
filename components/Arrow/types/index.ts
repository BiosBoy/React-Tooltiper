import { IArrow } from '../../../types'

export interface IProps extends IArrow {
  arrowWrapStyles?: string
  arrowStyles?: string
  arrowRotate?: {
    coordX: string
    coordY: string
  }
}
