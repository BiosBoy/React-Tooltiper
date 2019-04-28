import React from 'react'
import { mount } from 'enzyme'

import initialState, { disabled, rotatedArrow } from './mocks'
import Arrow from '..'

describe('<Tooltip Arrow test />', () => {
  it('should render basic Arrow', () => {
    const Component = mount(<Arrow {...initialState} />)

    expect(Component.find('Arrow').length).toBe(1)
    expect(Component.find('.arrowWrap').length).toBe(1)
    expect(Component.find('.tooltipArrow').length).toBe(1)

    expect(Component).toMatchSnapshot()
  })
  it('should not render Arrow in case of addArrow = false flag ', () => {
    const Component = mount(<Arrow {...disabled} />)

    expect(Component.find('Arrow').length).toBe(1)
    expect(Component.find('.arrowWrap').length).toBe(0)
    expect(Component.find('.tooltipArrow').length).toBe(0)

    expect(Component).toMatchSnapshot()
  })
  it('should render rotated Arrow on 180 degree', () => {
    const Component = mount(<Arrow {...rotatedArrow} />)

    expect(Component.find('Arrow').length).toBe(1)
    expect(Component.find('.arrowWrap').length).toBe(1)
    expect(Component.find('.tooltipArrow').length).toBe(1)
    expect(Component.find('.tooltipArrow').prop('className')).toContain('arrowcenterbottom')

    expect(Component).toMatchSnapshot()
  })
})
