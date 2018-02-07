import React from 'react'
import Enzyme, {mount, shallow} from 'enzyme'
import {Button} from './Button'
import adapter from 'enzyme-adapter-react-16'
import {createSerializer} from 'enzyme-to-json'

Enzyme.configure({adapter: new adapter() })
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}))


describe('tests for a simple button', ()=>{
  
  it ('should render a button', ()=>{
    const button = shallow(<Button/>)
    expect(button.length).toEqual(1)
  })

  it ('should render children', ()=>{
    const button = shallow(<Button>foo</Button>)
    expect(button.text()).toEqual('foo')

    const secondButton = shallow(<Button><div id="foo"/></Button>)
    expect(secondButton.find('div#foo').length).toEqual(1)
  })

  it ('should execute functions passed through onClickCallback', () =>{
    const mockCB = jest.fn()
    const wrapper = shallow(<Button onClickCallback={mockCB}/>)
    wrapper.simulate('click')
    expect (mockCB.mock.calls.length).toEqual(1)
  })
})