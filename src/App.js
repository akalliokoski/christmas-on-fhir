import React, { Component } from 'react';
import CheckIn from './components/CheckIn/CheckIn';
import Guide from './components/Guide/Guide';

const initialState = {
  checkedIn: false
}

class App extends Component {
  state = initialState;

  onCheckIn = () => {
    this.setState({ checkedIn: true })
  }

  render() {
    const { checkedIn } = this.state;
    return (
      <div className="App">
        {checkedIn ? <Guide /> : <CheckIn onCheckIn={this.onCheckIn}/>}
      </div>
    );
  }
}

export default App;
