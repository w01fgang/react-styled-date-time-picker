// import React, { Component } from 'react';
// import { DateTime } from 'luxon';

// import DateTimePicker from '../../';

// class App extends Component {
//   state = {
//     open: false,
//     returnState: false,
//     date: DateTime.local(),
//     returnDate: DateTime.local(),
//   }

//   setDate = (date) => {
//     const { returnState } = this.state;

//     if (returnState) {
//       this.setState({
//         returnDate: date,
//       });
//     } else {
//       this.setState({
//         date,
//         returnDate: date,
//       });
//     }
//   }

//   // receives selected date (DateTime object) as only argument
//   handleSelect = () => {
//     const { returnState } = this.state;

//     if (returnState) {
//       this.setState({
//         open: false,
//         returnState: false,
//       });
//     } else {
//       this.setState({
//         open: true,
//         returnState: true,
//       });
//     }
//   }

//   setReturnDate = (date) => {
//     this.setState({
//       returnDate: date,
//     });
//   }

//   openDatePicker = () => {
//     this.setState({
//       open: true,
//       returnState: false,
//     });
//   }

//   closeDatePickerAndOpenReturnDatePicker = () => {
//     this.setState({
//       returnState: true,
//       open: true,
//     });
//   }

//   closeDatePicker = () => {
//     this.setState({
//       open: false,
//       returnState: false,
//     });
//   }

//   render() {
//     const {
//       date, returnDate, open, returnState,
//     } = this.state;
//     return (
//       <div className="App">
//         <button type="button" onClick={this.openDatePicker}>
//           Open DatePicker
//         </button>
//         <br />
//         <button type="button" onClick={this.closeDatePickerAndOpenReturnDatePicker}>
//           Open return DatePicker
//         </button>
//         <p>
//           Date:
//           {`${date.day}.${date.month}.${date.year} ${date.hour}:${date.minute}`}
//           <br />
//           Return Date:
//           {`${returnDate.day}.${returnDate.month}.${returnDate.year} ${returnDate.hour}:${returnDate.minute}`}
//         </p>
//         <DateTimePicker
//           open={open}
//           value={date}
//           returnValue={returnDate}
//           onChange={this.setDate}
//           onSelect={this.handleSelect}
//           onClose={this.closeDatePicker}
//           language="en"
//           label={returnState ? 'Return' : 'Get'}
//           labelStyle={{
//             fontSize: 20,
//             color: 'black',
//           }}
//           returnState={returnState}
//         />
//       </div>
//     );
//   }
// }

// export default App;

/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

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

    this.setDate = this.setDate.bind(this)
    this.togglePicker = this.togglePicker.bind(this)
    this.changeDateStatus = this.changeDateStatus.bind(this)
    this.changeTimeStatus = this.changeTimeStatus.bind(this)
  }

  setDate = (date) => {
    if (this.state.dateState !== 'dateFrom') {
      this.setState({ toDate: date });
    } else {
      this.setState({ fromDate: date });
    }
  }

  changeTimeStatus = () => {
    console.log("change time state")
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

