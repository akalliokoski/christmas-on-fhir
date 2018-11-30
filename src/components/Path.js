import React, { Component } from 'react'

export default class Path extends Component {
  render() {
    const points = [...this.props.points];
    const start = points.shift();
    let d = `M${start[0]} ${start[1]} `
    d += points.map(p => `L${p[0]} ${p[1]}`).join(' ');
    // d += " Z"
    console.log(d)
    return (
      <path d={d} stroke="red" fill="none" />
    )
  }
}