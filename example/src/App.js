import React from 'react';

import { DateTime } from 'luxon';
import DateTimePicker from 'react-styled-date-time-picker';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: DateTime.local().set({ hours: 10, minutes: 0 }),
      toDate: DateTime.local().plus({ days: 1 }).set({ hours: 10, minutes: 0 }),
      open: false,
    };
  }

  setDate = (fromDate, toDate) => {
    this.setState({ fromDate, toDate });
  }

  togglePicker = () => this.setState(({ open }) => ({ open: !open }));

  render() {
    const { open, fromDate, toDate } = this.state;

    return (
      <div>
        <div>
          <input
            onClick={this.togglePicker}
            value={fromDate.toFormat('dd/MM/yyyy HH:mm')}
            readOnly
          />
        </div>
        <div>
          <input
            onClick={this.togglePicker}
            value={toDate.toFormat('dd/MM/yyyy HH:mm')}
            readOnly
          />
        </div>
        <DateTimePicker
          open={open}
          dateFrom={fromDate}
          dateTo={toDate}
          onSelect={this.setDate}
          onChange={this.setDate}
          onClose={this.togglePicker}
          language="en"
          label="Select date range"
          labelStyle={{
            fontSize: 20,
            color: '#263238',
          }}
        />
      </div>
    );
  }
}

export default App;
