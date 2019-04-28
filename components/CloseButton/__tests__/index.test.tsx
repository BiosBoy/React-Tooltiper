import React from 'react'
import { mount } from 'enzyme'

import initialState, { disabled } from './mocks'
import CloseButton from '..'

describe('<CloseButton Arrow test />', () => {
  it('should render basic CloseButton', () => {
    const Component = mount(<CloseButton {...initialState} />)

    expect(Component.find('CloseButton').length).toBe(1)
    expect(Component.find('.closeButton').length).toBe(1)

    Component.find('.closeButton').simulate('click')

    expect(Component).toMatchSnapshot()
  })
  it('should not render CloseButton in case of active flag is not provided ', () => {
    const Component = mount(<CloseButton {...disabled} />)

    expect(Component.find('CloseButton').length).toBe(1)
    expect(Component.find('.closeButton').length).toBe(0)

    expect(Component).toMatchSnapshot()
  })
})
