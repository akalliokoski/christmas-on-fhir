import React, { Component } from 'react'

export default class Room extends Component {
  render() {
    const { x, y, graphic } = this.props;
    const { width, height, svg } = graphic;
    const x0 = x - (width / 2);
    const y0 = y - (height / 2);
    const transform = `translate(${x0} ${y0})`
    return (
      <g width={width} height={height}
          transform={transform}>
        {svg}
      </g>
      
    )
  }
}
