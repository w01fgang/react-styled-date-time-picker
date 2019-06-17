import React from 'react';

import DateTimePicker from '../../';
import { DateTime } from 'luxon';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: DateTime.local(),
      toDate: DateTime.local().plus({days: 1}),
      open: false,
      dateState: 'dateFrom',
      timeState: 'timeFrom'
    };
  }

  setDate = (date) => {
    if (this.state.dateState !== 'dateFrom') {
      this.setState({ toDate: date });
    } else {
      this.setState({ fromDate: date });
      this.setState({ toDate: date});
    }
  }

  changeTimeStatus = () => {
    this.setState({timeState: 'timeTo', dateState: 'dateFrom'})
  }

  togglePicker = () => this.setState(({ open }) => ({ open: !open }));

  changeDateStatus = () => {
    if (this.state.dateState === 'dateTo') {
      this.setState({dateState: 'dateFrom'})
    } else {
      this.setState({dateState: 'dateTo'})
    }
  }

  render() {
    return (
      <div>
        <div>
          <input
            onClick={this.togglePicker}
            value={this.state.fromDate.toFormat('dd/MM/yyyy HH:mm')}
            readOnly
          />
        </div>
        <div>
          <input
            onClick={this.togglePicker}
            value={this.state.toDate.toFormat('dd/MM/yyyy HH:mm')}
            readOnly
          />
        </div>
        <DateTimePicker
          open={this.state.open}
          value={this.state.fromDate}
          returnValue={this.state.toDate}
          onSelect={this.changeDateStatus}
          onChange={this.setDate}
          onClose={this.togglePicker}
          language="en"
          label="Some Label"
          labelStyle={{
            fontSize: 20,
            color: 'red',
          }}
          returnState={this.state.dateState !== 'dateFrom'}
        />
      </div>
    );
  }
}

export default App;

