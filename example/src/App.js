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
    const { returnState } = this.state;

    if (returnState) {
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

  // receives selected date (DateTime object) as only argument
  handleSelect = () => {
    const { returnState } = this.state;

    if (returnState) {
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
    this.setState({
      open: false,
      returnState: false,
    });
  }

  render() {
    const {
      date, returnDate, open, returnState,
    } = this.state;
    return (
      <div className="App">
        <button type="button" onClick={this.openDatePicker}>
          Open DatePicker
        </button>
        <br />
        <button type="button" onClick={this.closeDatePickerAndOpenReturnDatePicker}>
          Open return DatePicker
        </button>
        <p>
          Date:
          {`${date.day}.${date.month}.${date.year} ${date.hour}:${date.minute}`}
          <br />
          Return Date:
          {`${returnDate.day}.${returnDate.month}.${returnDate.year} ${returnDate.hour}:${returnDate.minute}`}
        </p>
        <DateTimePicker
          open={open}
          value={date}
          returnValue={returnDate}
          onChange={this.setDate}
          onSelect={this.handleSelect}
          onClose={this.closeDatePicker}
          language="en"
          label={returnState ? 'Return' : 'Get'}
          labelStyle={{
            fontSize: 20,
            color: 'black',
          }}
          returnState={returnState}
        />
      </div>
    );
  }
}

export default App;
