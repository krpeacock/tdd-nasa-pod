import './testSetup';
import React from 'react'
import {mount, shallow} from 'enzyme'
import {Picture} from './Picture';
import td from 'testdouble';


describe('Picture', () => {
  describe('render', () => {
    it('should render a title', ()=> {
      const wrapper = shallow(<Picture/>)
      expect(wrapper.find('h1.title').length).toEqual(1)
    })

    it('should render a description', ()=>{
      const wrapper = shallow(<Picture/>)
      expect(wrapper.find('p.explanation').length).toEqual(1)
    })
    it('should render a picture', ()=>{
      const wrapper = shallow(<Picture/>)
      expect(wrapper.find('img').length).toEqual(1)
    })
  })

  describe('use data', ()=>{
    it('should show a title from state', ()=>{
      const wrapper = shallow(<Picture/>)
      expect(wrapper.find('h1.title').text()).toEqual('Title')
    })
    it('should show an image from state', ()=>{
      const wrapper = shallow(<Picture/>)
      expect(wrapper.contains(<img src="https://picsum.photos/200/300"/>)).toEqual(true)
    })
    it('should show a title from state', ()=>{
      const wrapper = shallow(<Picture/>)
      expect(wrapper.find('p.explanation').text()).toEqual('Description')
    })
  })

  describe('fetch data', ()=> {
    it('should show fetched title',async ()=>{
      const fetchNasaPicture = td.function()
      const date = "2018-01-01"
      td.when(fetchNasaPicture(date)).thenResolve({
        title: "Title of the picture",
        explanation: "description of the picture",
        url: "http://fetched.link"
      })

      const wrapper = mount(<Picture
        date={date}
        fetchNasaPicture={fetchNasaPicture}
      />)

      const flushAllPromises = () => new Promise(resolve => setImmediate(resolve))
      await flushAllPromises()
      expect(wrapper.find('h1.title').text()).toEqual('Title of the picture')
    })

    it('should show a new title when it gets a new date', async()=>{
      const fetchNasaPicture = td.function()
      const date = "2018-01-02"
      td.when(fetchNasaPicture(date)).thenResolve({
        title: "Title of the picture",
        explanation: "description of the picture",
        url: "http://fetched.link"
      })
      const newDate = "2018-01-01"
      td.when(fetchNasaPicture(newDate)).thenResolve({
        title: "Title of the picture for newDate",
        explanation: "description of the picture",
        url: "http://fetched.link"
      })

      const wrapper = mount(<Picture
        date={date}
        fetchNasaPicture={fetchNasaPicture}
      />)

      const flushAllPromises = () => new Promise(resolve => setImmediate(resolve))
      wrapper.setProps({date: newDate})
      wrapper.update()
      await flushAllPromises()

      expect(wrapper.find('h1.title').text()).toEqual('Title of the picture for newDate')
    })
  })
})