import React, { Component } from 'react';
import Background from './Background';
import  Room from './Room';
import  Path from './Path';
import '../../assets/twitter.svg';
import '../../assets/facebook.svg';

const initialState = {
  canvas: {
    width: 640,
    height: 320
  },
  icons: {
    "twitter": {
      width: 50,
      height: 50,
      href: "#twitter"
    },
    "facebook": {
      width: 50,
      height: 50,
      href: "#facebook"
    }
  },
  rooms: [
    {
      id: "A1",
      x: 100,
      y: 100,
      icon: "twitter"
    },
    {
      id: "B2",
      x: 540,
      y: 220,
      icon: "facebook"
    }
  ],
  path: [
    [100, 100],
    [540, 100],
    [540, 220]
  ]
}

class Guide extends Component {
  state = initialState

  renderRoom(room) {
    const { id, x, y, icon } = room;
    const { icons } = this.state;
    const iconObject = icons[icon];

    return (
      <Room
        key={id}
        x={x}
        y={y}
        icon={iconObject} />
    )
  }

  render() {
    const { width, height } = this.state.canvas;
    const { rooms, path } = this.state;
    return (
      <div className="guide">
        <svg width={width} height={height}>
          <Background width={width} height={height} />
          { rooms.map(room => this.renderRoom(room)) }
          <Path points={path} />
        </svg>
      </div>
    );
  }
}

export default Guide;
