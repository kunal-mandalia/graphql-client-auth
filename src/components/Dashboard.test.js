import React from 'react'
import { Dashboard } from './Dashboard'
import { shallow } from 'enzyme'

describe(`<Dashboard />`, () => {
  const props = { data: { getMyProfile: { username: 'Kunal', email: 'kunal.v.mandalia@gmail.com' }, loading: false }}
  it(`should allow user to update username`, () => {
    const newUsername = 'Galois'
    const wrapper = shallow(<Dashboard {...props} />)
    expect(wrapper.find('#new-username').props().value).toEqual('')
    wrapper.find('#new-username').simulate('change', {target: {value: newUsername}})
    expect(wrapper.state().newUsername).toEqual(newUsername)
  })
})