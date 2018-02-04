import React from 'react'
import { Dashboard } from './Dashboard'
import { shallow } from 'enzyme'

describe(`<Dashboard />`, () => {
  describe(`given query error`, () => {
    const props = { data: { error: { message: '404' } } }
    it(`should render Error`, () => {
      const wrapper = shallow(<Dashboard {...props} />)
      expect(wrapper.find('#error')).toHaveLength(1)
    })
  })

  describe('given getMyProfile query fetched ok', () => {
    const mockMutate = () => new Promise((resolve, reject) => {
      resolve({ data: { updateUsername: { token: 'dummy_token' }}})
    })
    const props = {
      data: {
        getMyProfile: {
          username: 'Kunal',
          email: 'kunal.v.mandalia@gmail.com'
        },
        loading: false
      },
      mutate: mockMutate
    }
    it(`should allow user to update username`, () => {
      const newUsername = 'Galois'
      const wrapper = shallow(<Dashboard {...props} />)
      expect(wrapper.find('#new-username').props().value).toEqual('')
      wrapper.find('#new-username').simulate('change', {target: {value: newUsername}})
      expect(wrapper.state().newUsername).toEqual(newUsername)
    })

    it(`should persist new username in localStorage`, async () => {
      const newUsername = 'Galois'
      const wrapper = shallow(<Dashboard {...props} />)
      wrapper.find('#new-username').simulate('change', {target: {value: newUsername}})
      await wrapper.find('#save-user-details').simulate('click')
      expect(localStorage.setItem).toBeCalledWith('token', 'dummy_token')
    })
  })
})