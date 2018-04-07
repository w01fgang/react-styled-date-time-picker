import React, { Component } from 'react';
import { DateTime } from 'luxon';

import DateTimePicker from 'react-styled-date-time-picker';

class App extends Component {
  state = {
    open: false,
    returnOpen: false,
    date: DateTime.local(),
    returnDate: DateTime.local(),
  }
  setDate = (date) => {
    this.setState({
      date,
      returnDate: date,
    });
  }
  setDateReturn = (date) => {
    this.setState({
      returnDate: date,
    });
  }
  openToggle = () => {
    this.setState({
      open: true,
    });
  }
  closeToggle = () => {
    this.setState({
      open: false,
      returnOpen: true,
    });
  }
  closeToggleReturn = () => {
    this.setState({
      returnOpen: false,
    });
  }

  setDate = date => this.setState(() => ({ date }));

  togglePicker = () => this.setState(state => ({ open: !state.open }));

  render() {
    const date = this.state.date.c;
    const reutnrDate = this.state.returnDate.c;
    return (
      <div className="App">
        <button onClick={this.openToggle}>
          Open DatePicker Example
        </button>
        <p>
          Date: 
          {`${date.day}.${date.month}.${date.year} ${date.hour}:${date.minute}`} <br />
          Return Date: 
          {`${reutnrDate.day}.${reutnrDate.month}.${reutnrDate.year} ${reutnrDate.hour}:${reutnrDate.minute}`}
        </p>
        <DateTimePicker
          open={this.state.open}
          value={this.state.date}
          onChange={this.setDate}
          onClose={this.closeToggle}
          language="ru"
          label="Get"
          labelStyle={{
            fontSize: 20,
            color: 'black',
          }}
        />
        <DateTimePicker 
          open={this.state.returnOpen}
          value={this.state.returnDate}
          onChange={this.setDateReturn}
          onClose={this.closeToggleReturn}
          language="ru"
          label="Return"
          labelStyle={{
            fontSize: 20,
            color: 'black',
          }}
          markDate={this.state.date}
        />
      </div>
    );
  }
}

export default App;
