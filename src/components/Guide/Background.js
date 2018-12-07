import React, { Component } from 'react';

class Background extends Component {
  
  render() {
    const { width, height } = this.props;
    return (
      <rect
            x="0"
            y="0"
            width={width}
            height={height} 
            fill="lightgrey" 
            stroke="black"/>
    )
  }
}

export default Background;