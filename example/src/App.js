import React, { Component } from 'react';
import { DateTime } from 'luxon';

import DateTimePicker from '../../';

class App extends Component {
  state = {
    open: false,
    date: DateTime.local()
  }
  togglePicker = () => {
    this.setState({
      open: !this.state.open
    });
  }
  setDate = (date) => {
    this.setState({
      date
    });
  }
  render() {
    const date = this.state.date.c;
    return (
      <div className="App">
        <button onClick={this.togglePicker}>
          Open DatePicker Example
        </button>
        <p>
          Date: 
          {`${date.day}.${date.month}.${date.year} ${date.hour}:${date.minute}`}
        </p>
        <DateTimePicker 
          open={this.state.open}
          value={this.state.date}
          onChange={this.setDate}
          onClose={this.togglePicker}
          language="ru"
          label="Some Label"
          labelStyle={{
            fontSize: 20,
            color: 'red'
          }}
        />
      </div>
    );
  }
}

export default App;
