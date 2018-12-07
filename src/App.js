import React, { Component } from 'react';
import CheckIn from './components/CheckIn/CheckIn';
import Guide from './components/Guide/Guide';

const initialState = {
  checkIn: true
}

class App extends Component {
  state = initialState;

  render() {
    const { checkIn } = this.state;
    return (
      <div className="App">
        {checkIn ? <CheckIn /> : <Guide></Guide>}
      </div>
    );
  }
}

export default App;
