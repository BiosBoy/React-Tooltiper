import React, { PureComponent } from 'react'

import { IProps } from './types'
import styles from './index.cssmodule.scss'

class Arrow extends PureComponent<IProps> {
  render() {
    const {
      addArrow,
      arrowWrapStyles,
      arrowStyles,
      arrowRotate: { coordX = 'center', coordY = 'top' } = {}
    } = this.props

    if (!addArrow) {
      return null
    }

    return (
      <div className={arrowWrapStyles}>
        <div className={`${styles.arrow} ${styles[`arrow${coordX}${coordY}`]} ${arrowStyles}`} />
      </div>
    )
  }
}

export default Arrow
