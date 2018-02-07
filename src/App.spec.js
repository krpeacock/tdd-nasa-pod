import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import App from './App'
import {Button} from './Button';
import { Picture } from "./Picture";
import adapter from 'enzyme-adapter-react-16';
import MockDate from 'mockdate';
import fetchMock from 'fetch-mock'
import {createSerializer} from 'enzyme-to-json';

Enzyme.configure({adapter: new adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

describe('App', () => {
  beforeEach(()=>{
    MockDate.reset()
  })

  describe('render', ()=> {
    it('should render the header', () => {
      const wrapper = shallow(<App/>)

      const header = wrapper.find('h1.header')
      expect(header.length).toEqual(1)
      expect(header.text()).toEqual("Nasa Picture of the Day")
    })
    it('should render the current date in a human-readable format', () => {
      MockDate.set('1/2/2018');
      const wrapper = shallow(<App/>);
      const dateSpan = wrapper.find('span.date');
      expect(dateSpan.length).toEqual(1);
      expect(dateSpan.text()).toEqual('2018-01-02');
    })

    it('should render two buttons', ()=>{
      const wrapper = shallow(<App/>);
      const button = wrapper.find(Button)
      expect(button.length).toEqual(2)
    })

    it('should render a button for moving back in time', ()=>{
      const wrapper = shallow(<App/>);
      const button = wrapper.find(Button).filterWhere(b=>b.children().text()==="<")
      expect(button.length).toEqual(1)
    })

    it('should render a button for moving forward in time', ()=>{
      const wrapper = shallow(<App/>);
      const button = wrapper.find(Button).filterWhere(b=>b.children().text()===">")
      expect(button.length).toEqual(1)
    })

    it('should render the picture component with the date from the state passed to it', () => {
      MockDate.set("4/5/2010")
      const wrapper = shallow(<App/>)
      const picture = wrapper.find(Picture).find({date: "2010-04-05"})
      expect(picture.length).toEqual(1);
    })

    it('renders correctly', ()=> {
      const wrapper = shallow(<App/>)
      MockDate.set("4/5/2010")
      expect(wrapper).toMatchSnapshot()
    })

    describe('change date',()=>{
      it('should change date back when clicked on the "back in time" button', ()=>{
        MockDate.set('2/3/2017')
        const wrapper = mount(<App/>)
        const dateSpan = wrapper.find('span.date')
        const backInTimeButton = wrapper.find(Button).filter('.test-back')

        expect(dateSpan.text()).toEqual("2017-02-03")
        backInTimeButton.simulate('click')

        expect(dateSpan.text()).toEqual("2017-02-02")
      })
      it('should change date forward when you click on the "forward in time" button', ()=>{
        MockDate.set('2/3/2017')
        const wrapper = mount(<App/>)
        const dateSpan = wrapper.find('span.date')
        const backInTimeButton = wrapper.find(Button).filter('.test-back')

        expect(dateSpan.text()).toEqual("2017-02-03")
        
        backInTimeButton.simulate('click')

        expect(dateSpan.text()).toEqual("2017-02-02")

        const forwardInTimeButton = wrapper.find(Button).filter('.test-forward')

        forwardInTimeButton.simulate('click')

        expect(dateSpan.text()).toEqual("2017-02-03")
      })

    })
  })
})