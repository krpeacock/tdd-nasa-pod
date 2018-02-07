import React, { Component } from 'react';
import {Button} from './Button';
import {Picture} from "./Picture";
import {dateToText} from './dateToText';
import logo from './logo.svg';
import './App.css';

const millisecondsPerDay = 24 * 60 * 60 * 1000
const directions = {
  BACK: -millisecondsPerDay,
  FORWARD: millisecondsPerDay
}

class App extends Component {
  state = {
    date: new Date()
  }

  onDecreaseDate = () => {
    this.stepByDay('BACK')
  }

  onIncreaseDate = () => {
    this.stepByDay('FORWARD')
  }

  stepByDay = (direction) => {
    let newDate = new Date(this.state.date.getTime() + directions[direction])
    if (newDate <= Date.now()){
      this.setState({date: newDate})
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="header">Nasa Picture of the Day</h1>
        <Button className="test-back" onClickCallback={this.onDecreaseDate}>{'\<'}</Button>
        <span className="date">{dateToText(this.state.date)}</span>
        <Button className="test-forward" onClickCallback={this.onIncreaseDate}>{'\>'}</Button>
        <Picture date={dateToText(this.state.date)}/>
      </div>
    );
  }
}

export default App;
