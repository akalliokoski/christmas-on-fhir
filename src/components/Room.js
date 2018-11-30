import React, { Component } from 'react'
import '../assets/twitter.svg';

export default class Room extends Component {
  render() {
    const { x, y, graphic } = this.props;
    const { width, height } = graphic;
    const x0 = x - (width / 2);
    const y0 = y - (height / 2);
    const transform = `translate(${x0} ${y0})`
    return (
      <g width={width} height={height}
          transform={transform}>
        <use x={-width/2} y={-height/2} width={width} height={height} href="#twitter" />
        <circle cx="0" cy="0" r="5" fill="lightblue"/>
      </g>
    )
  }
}
