import React from 'react'
import { mount } from 'enzyme'

import initialState, { withoutArrow, closeButton, positionCoords, customCoords, manualCoodsFix } from './mocks'
import Tooltip from '..'
import { tooltipSubscriber } from '../utils'

describe('<Tooltip test />', () => {
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 120,
        height: 120,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    })
  })

  it('should render basic Tooltip with Title and Arrow included', () => {
    const Wrapper = mount(<div id='tooltip-test' />)
    const Component = mount(<Tooltip {...initialState} />)

    Component.setState({
      showTooltip: true,
      tooltipNode: Component.find('ToolTip'),
      parentNode: Wrapper.find('#tooltip-test'),
      tooltip: { child: 'TEST TOOLTIP', ID: 'tooltip-test' }
    })
    Component.update()

    tooltipSubscriber.subscribe({ child: 'TEST TOOLTIP', ID: 'tooltip-test' })

    Wrapper.find('#tooltip-test').simulate('mouseOver')
    Wrapper.find('#tooltip-test').simulate('mouseover')

    expect(Component.find('ToolTip').length).toBe(1)
    expect(Component.find('.tooltipContainer').length).toBe(1)
    expect(Component.find('.title').length).toBe(1)
    expect(Component.find('.title').text()).toBe('TEST TOOLTIP')
    expect(Component.find('.tooltipArrow').length).toBe(1)

    expect(Component).toMatchSnapshot()
  })
  it('should not render Tooltip in case of showTooltip = false flag ', () => {
    const Component = mount(<Tooltip {...initialState} />)

    Component.setState({
      showTooltip: false,
      tooltipNode: null,
      parentNode: null,
      tooltip: { child: '', ID: '' }
    })
    Component.update()

    expect(Component.find('ToolTip').length).toBe(1)
    expect(Component.find('.tooltipContainer').length).toBe(0)
    expect(Component.find('.title').length).toBe(0)
    expect(Component.find('.tooltipArrow').length).toBe(0)

    expect(Component).toMatchSnapshot()
  })
  it('should render Tooltip without Arrow', () => {
    const Wrapper = mount(<div id='tooltip-test' />)
    const Component = mount(<Tooltip {...withoutArrow} />)

    Component.setState({
      showTooltip: true,
      tooltipNode: Component.find('ToolTip'),
      parentNode: Wrapper.find('#tooltip-test'),
      tooltip: { child: 'TEST TOOLTIP', ID: 'tooltip-test' }
    })

    Component.update()

    expect(Component.find('ToolTip').length).toBe(1)
    expect(Component.find('.tooltipContainer').length).toBe(1)
    expect(Component.find('.title').length).toBe(1)
    expect(Component.find('.tooltipArrow').length).toBe(0)

    expect(Component).toMatchSnapshot()
  })
  it('should render Tooltip with Close Button', () => {
    const Wrapper = mount(<div id='tooltip-test' />)
    const Component = mount(<Tooltip {...closeButton} />)

    Component.setState({
      showTooltip: true,
      tooltipNode: Component.find('ToolTip'),
      parentNode: Wrapper.find('#tooltip-test'),
      tooltip: { child: 'TEST TOOLTIP', ID: 'tooltip-test' }
    })

    Component.update()

    expect(Component.find('ToolTip').length).toBe(1)
    expect(Component.find('.tooltipContainer').length).toBe(1)
    expect(Component.find('CloseButton').length).toBe(1)
    expect(Component.find('.closeButton').text()).toBe('XXX')
    expect(Component.find('.title').length).toBe(1)
    expect(Component.find('.tooltipArrow').length).toBe(1)

    expect(Component).toMatchSnapshot()
  })
  it('should render Tooltip with Close Button. By click on it should remove Tooltip at all', () => {
    const Wrapper = mount(<div id='tooltip-test' />)
    const Component = mount(<Tooltip {...closeButton} />)

    Component.setState({
      showTooltip: true,
      tooltipNode: Component.find('ToolTip'),
      parentNode: Wrapper.find('#tooltip-test'),
      tooltip: { child: 'TEST TOOLTIP', ID: 'tooltip-test' }
    })

    Component.update()

    expect(Component.find('ToolTip').length).toBe(1)
    expect(Component.find('.tooltipContainer').length).toBe(1)
    expect(Component.find('CloseButton').length).toBe(1)
    expect(Component.find('.closeButton').text()).toBe('XXX')
    expect(Component.find('.title').length).toBe(1)
    expect(Component.find('.tooltipArrow').length).toBe(1)

    expect(Component).toMatchSnapshot()

    Component.find('.closeButton').simulate('click')
    Component.setState({
      showTooltip: false,
      tooltipNode: null,
      parentNode: null,
      tooltip: { child: '', ID: '' }
    })
    Component.update()

    expect(Component.state('showTooltip')).toBe(false)
    expect(Component.find('ToolTip').length).toBe(1)
    expect(Component.find('CSSTransition').length).toBe(1)
    expect(Component.find('CSSTransition').prop('in')).toBe(false)

    expect(Component).toMatchSnapshot()
  })
  it('should render Tooltip by position props', () => {
    const Wrapper = mount(<div id='tooltip-test' />)
    const Component = mount(<Tooltip {...positionCoords} />)

    Component.setState({
      showTooltip: true,
      tooltipNode: Component.find('ToolTip'),
      parentNode: Wrapper.find('#tooltip-test'),
      tooltip: { child: 'TEST TOOLTIP', ID: 'tooltip-test' }
    })

    Component.update()

    expect(Component.find('ToolTip').length).toBe(1)
    expect(Component.find('.tooltipContainer').length).toBe(1)
    expect(Component.prop('position')).toEqual({ x: 'center', y: 'top' })

    expect(Component).toMatchSnapshot()
  })
  it('should render Tooltip by custom coords props', () => {
    const Wrapper = mount(<div id='tooltip-test' />)
    const Component = mount(<Tooltip {...customCoords} />)

    Component.setState({
      showTooltip: true,
      tooltipNode: Component.find('ToolTip'),
      parentNode: Wrapper.find('#tooltip-test'),
      tooltip: { child: 'TEST TOOLTIP', ID: 'tooltip-test' }
    })

    Component.update()

    expect(Component.find('ToolTip').length).toBe(1)
    expect(Component.find('.tooltipContainer').length).toBe(1)
    expect(Component.prop('customCoords')).toEqual({ top: '105px', left: '20px' })

    expect(Component).toMatchSnapshot()
  })
  it('should render Tooltip by manual coords coords fix props', () => {
    const Wrapper = mount(<div id='tooltip-test' />)
    const Component = mount(<Tooltip {...manualCoodsFix} />)

    Component.setState({
      showTooltip: true,
      tooltipNode: Component.find('ToolTip'),
      parentNode: Wrapper.find('#tooltip-test'),
      tooltip: { child: 'TEST TOOLTIP', ID: 'tooltip-test' }
    })

    Component.update()

    expect(Component.find('ToolTip').length).toBe(1)
    expect(Component.find('.tooltipContainer').length).toBe(1)
    expect(Component.prop('manualCoodsFix')).toEqual({ fixX: -2, fixY: -3 })

    expect(Component).toMatchSnapshot()
  })
})
