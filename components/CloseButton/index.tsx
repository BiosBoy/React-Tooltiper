import React, { PureComponent } from 'react'

import { IProps } from './types'

class CloseButton extends PureComponent<IProps> {
  _handleClick = e => {
    const { clickAction } = this.props

    if (!clickAction) return

    clickAction()

    // shold not affect events during bubbling phase
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    const { active, buttonChildren, buttonStyles } = this.props

    if (!active) {
      return null
    }

    return (
      <button type='button' className={buttonStyles} onClick={this._handleClick}>
        {buttonChildren || 'X'}
      </button>
    )
  }
}

export default CloseButton
