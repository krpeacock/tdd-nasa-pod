import React, {Component} from 'react'
import { fetchNasaPicture } from "./fetchNasaPicture";

export class Picture extends Component {
  state = {
    title: "Title",
    url: "https://picsum.photos/200/300",
    explanation: "Description"
  }

  async componentWillMount(){
    const data = await this.props.fetchNasaPicture(this.props.date)
    this.setState({...data})
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const data = await nextProps.fetchNasaPicture(nextProps.date)
    this.setState(data)
  }

  render(){
    let {title, url, explanation} = this.state
    return (
      <div>
        <h1 className="title">{title}</h1>
        <img src={url} />
        <p className="explanation">{explanation}</p>
      </div>
    )
  }
}

Picture.defaultProps = {
  fetchNasaPicture: fetchNasaPicture
}