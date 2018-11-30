import React, { Component } from 'react';
import './App.css';
import Background from './components/Background';
import  Room from './components/Room';

const initialState = {
  canvas: {
    width: 640,
    height: 320
  },
  rooms: [
    {
      id: "A1",
      x: 100,
      y: 100,
      graphic: {
        width: 50,
        height: 50,
        svg: <rect x="0" y="0" width="50" height="50" fill="cornflowerblue"/>
      }
    },
    {
      id: "B2",
      x: 550,
      y: 220,
      graphic: {
        width: 50,
        height: 50,
        svg: <circle cx="0" cy="0" r="25" fill="aliceblue"/>
      }
    }
  ]
}

class App extends Component {
  state = initialState

  renderRoom(room) {
    const { id, x, y, graphic } = room; 
    return (
      <Room key={id} x={x} y={y} graphic={graphic} />
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
