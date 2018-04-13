import React, { Component } from 'react';
import { DateTime } from 'luxon';

import DateTimePicker from '../../';

class App extends Component {
  state = {
    open: false,
    returnState: false,
    date: DateTime.local(),
    returnDate: DateTime.local(),
  }
  setDate = (date) => {
    if (this.state.returnState) {
      this.setState({
        returnDate: date,
      });
    } else {
      this.setState({
        date,
        returnDate: date,
      });
    }
  }
  setReturnDate = (date) => {
    this.setState({
      returnDate: date,
    });
  }
  openDatePicker = () => {
    this.setState({
      open: true,
      returnState: false,
    });
  }
  closeDatePickerAndOpenReturnDatePicker = () => {
    this.setState({
      returnState: true,
      open: true,
    });
  }
  closeDatePicker = () => {
    if (this.state.returnState) {
      this.setState({
        open: false,
        returnState: false,
      });
    } else {
      this.setState({
        open: true,
        returnState: true,
      });
    }
  }

  render() {
    const { date, returnDate } = this.state;
    return (
      <div className="App">
        <button onClick={this.openDatePicker}>
          Open DatePicker
        </button>
        <br />
        <button onClick={this.closeDatePickerAndOpenReturnDatePicker}>
          Open return DatePicker
        </button>
        <p>
          Date: 
          {`${date.day}.${date.month}.${date.year} ${date.hour}:${date.minute}`} <br />
          Return Date: 
          {`${returnDate.day}.${returnDate.month}.${returnDate.year} ${returnDate.hour}:${returnDate.minute}`}
        </p>
        <DateTimePicker
          open={this.state.open}
          value={this.state.date}
          returnValue={this.state.returnDate}
          onChange={this.setDate}
          onClose={this.closeDatePicker}
          language="en"
          label={this.state.returnState ? 'Return' : 'Get'}
          labelStyle={{
            fontSize: 20,
            color: 'black',
          }}
          returnState={this.state.returnState}
          previousDateToggle
        />
      </div>
    );
  }
}

export default App;
