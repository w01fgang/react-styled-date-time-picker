import React, { Component } from 'react';
import { DateTime } from 'luxon';

import DateTimePicker from 'react-styled-date-time-picker';

class App extends Component {
  state = {
    open: false,
    date: DateTime.local(),
  }

  setDate = date => this.setState(() => ({ date }));

  togglePicker = () => this.setState(state => ({ open: !state.open }));

  render() {
    const { date } = this.state;
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
            color: 'red',
          }}
        />
      </div>
    );
  }
}

export default App;
