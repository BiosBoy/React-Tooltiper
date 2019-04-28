import classnames from 'classnames'
import styles from '../styles/index.cssmodule.scss'

const classNamesHolder = overrideStyles => {
  const wrapStyles = classnames({
    [styles.tooltipWrap]: true,
    [overrideStyles.wrap]: true
  })

  const containerStyles = classnames({
    [overrideStyles.container]: true,
    [styles.tooltipContainer]: true
  })

  const titleStyles = classnames({
    [styles.title]: true,
    [overrideStyles.title]: true
  })

  const buttonStyles = classnames({
    [styles.button]: true,
    [styles.closeButton]: true,
    [overrideStyles.button]: true
  })

  const arrowWrapStyles = classnames({
    [overrideStyles.arrowWrap]: true,
    [styles.arrowWrap]: true
  })

  const arrowStyles = classnames({
    [overrideStyles.tooltipArrow]: true,
    [styles.tooltipArrow]: true
  })

  return {
    wrapStyles,
    containerStyles,
    titleStyles,
    buttonStyles,
    arrowWrapStyles,
    arrowStyles
  }
}

export default classNamesHolder
