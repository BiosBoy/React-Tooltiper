import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { withBackgrounds } from '@storybook/addon-backgrounds'
import centered from '@storybook/addon-centered'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'

import styles from './mocks/index.cssmodule.scss'

import Tooltip from '../index'
import { tooltipSubscriber } from '../utils'
import { CLOSE_BUTTON, ARROW, TITLE, ANIM_PROPS } from './mocks'

const POSSIBLE_LAYOUTS = [
  { name: 'ccc', value: '#ccc', default: true },
  { name: 'white', value: '#fff' },
  { name: 'black', value: '#111' }
]

const STORY_GROUPS = {
  common: 'Common',
  closeButton: 'Close Button',
  addArrow: 'Arrow',
  animProps: 'Animation',
  overrideStyles: 'Styles'
}

const STYLES_WRAPPER = {
  width: '100px',
  height: '100px',
  background: 'black',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const store = new Store({
  showTooltip: false
})

const CONTAINER_TITLE = 'Hover Me'
const PARENT = {
  ID: 'storybook'
}

const storeButton = {
  checkIsButtonActive: false
}

/* -------------------------------- */
// STORYBBOk PROPS UPDATE LOGIC START
/* -------------------------------- */

const _setFalse = () => store.set({ showTooltip: false })
const _getActions = parent => {
  parent && parent.addEventListener('mouseenter', () => store.set({ showTooltip: true }))

  // hack for practicing handler by clicking on the close button
  storeButton.checkIsButtonActive
    && parent
    && parent.addEventListener('mouseleave', () => store.set({ showTooltip: true }))
  !storeButton.checkIsButtonActive && parent && parent.addEventListener('mouseleave', () => _setFalse())

  // parent && parent.addEventListener('mouseleave', () => store.set({ showTooltip: true })
  // parent && parent.addEventListener('mouseleave', () => store.set({ showTooltip: false })
}

const _getParent = () => document.getElementById('storybook')

document.addEventListener('DOMContentLoaded', () => _getActions(_getParent()))
document.body.addEventListener('DOMSubtreeModified', () => _getActions(_getParent()))

class Wrapper extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  }

  componentDidMount() {
    const { children } = this.props

    if (children.props.closeButton.active === true) {
      storeButton.checkIsButtonActive = true
    }

    tooltipSubscriber.subscribe({ child: TITLE, ID: PARENT.ID })
  }

  render() {
    const { children } = this.props

    return (
      <div id='storybook' style={STYLES_WRAPPER}>
        {CONTAINER_TITLE}
        <State store={store}>{children}</State>
      </div>
    )
  }
}

/* -------------------------------- */
// STORYBBOK PROPS UPDATE LOGIC END
/* -------------------------------- */

storiesOf('Shared.Tooltip', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(withBackgrounds(POSSIBLE_LAYOUTS))
  .add('defaults', () => {
    const config = {
      addArrow: boolean('Add Arrow:', ARROW, STORY_GROUPS.common),
      closeButton: {
        active: boolean('Active Button:', CLOSE_BUTTON.active, STORY_GROUPS.closeButton),
        buttonChildren: text('Button Children:', CLOSE_BUTTON.buttonChildren, STORY_GROUPS.closeButton)
      },
      animProps: {
        className: text('Animation name:', ANIM_PROPS.className, STORY_GROUPS.animProps),
        timeExit: text('Time Enter:', ANIM_PROPS.timeExit, STORY_GROUPS.animProps),
        timeIn: text('Time Exit:', ANIM_PROPS.timeIn, STORY_GROUPS.animProps)
      },
      overrideStyles: {},
      actionOnEntered: () => {},
      actionOnExit: () => {}
    }

    return (
      <Wrapper>
        <Tooltip {...config} />
      </Wrapper>
    )
  })
  .add('close by button mode', () => {
    const config = {
      showTooltip: boolean('Show Tooltip:', true),
      addArrow: boolean('Add Arrow:', true),
      closeButton: {
        active: boolean('Active Button:', true),
        buttonChildren: text('Button Children:', ''),
        actionOnClose: () => store.set({ showTooltip: false })
      },
      actionOnEntered: () => {},
      actionOnExit: () => {}
    }

    return (
      <Wrapper>
        <Tooltip {...config} />
      </Wrapper>
    )
  })
  .add('without arrow mode', () => {
    const config = {
      showTooltip: boolean('Show Tooltip:', true),
      addArrow: false,
      actionOnEntered: () => {},
      actionOnExit: () => {}
    }

    return (
      <Wrapper>
        <Tooltip {...config} />
      </Wrapper>
    )
  })
  .add('override styles mode', () => {
    const config = {
      showTooltip: boolean('Show Tooltip:', true),
      addArrow: boolean('Add Arrow:', true),
      overrideStyles: { ...styles },
      actionOnEntered: () => {},
      actionOnExit: () => {}
    }

    return (
      <Wrapper>
        <Tooltip {...config} />
      </Wrapper>
    )
  })
  .add('top layout', () => {
    const config = {
      showTooltip: boolean('Show Tooltip:', true),
      addArrow: boolean('Add Arrow:', true),
      position: { x: 'center', y: 'top' },
      actionOnEntered: () => {},
      actionOnExit: () => {}
    }

    return (
      <Wrapper>
        <Tooltip {...config} />
      </Wrapper>
    )
  })
  .add('right layout', () => {
    const config = {
      showTooltip: boolean('Show Tooltip:', true),
      addArrow: boolean('Add Arrow:', true),
      position: { x: 'right', y: 'center' },
      actionOnEntered: () => {},
      actionOnExit: () => {}
    }

    return (
      <Wrapper>
        <Tooltip {...config} />
      </Wrapper>
    )
  })
  .add('bottom layout', () => {
    const config = {
      showTooltip: boolean('Show Tooltip:', true),
      addArrow: boolean('Add Arrow:', true),
      position: { x: 'center', y: 'bottom' },
      actionOnEntered: () => {},
      actionOnExit: () => {}
    }

    return (
      <Wrapper>
        <Tooltip {...config} />
      </Wrapper>
    )
  })
  .add('left layout', () => {
    const config = {
      showTooltip: boolean('Show Tooltip:', true),
      addArrow: boolean('Add Arrow:', true),
      position: { x: 'left', y: 'center' },
      actionOnEntered: () => {},
      actionOnExit: () => {}
    }

    return (
      <Wrapper>
        <Tooltip {...config} />
      </Wrapper>
    )
  })
