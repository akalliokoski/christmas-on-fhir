import React, { Component } from 'react';
import './App.css';
import Background from './components/Background';
import  Room from './components/Room';
import './assets/twitter.svg';
import './assets/facebook.svg';

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
      x: 550,
      y: 220,
      icon: "facebook"
    }
  ]
}

class App extends Component {
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
    const { rooms } = this.state;
    return (
      <div className="App">
        <svg width={width} height={height}>
          <Background width={width} height={height} />
          { rooms.map(room => this.renderRoom(room)) }
        </svg>
      </div>
    );
  }
}

export default App;
