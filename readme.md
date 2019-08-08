## Minimal example

```javascript
import React, { Component } from 'react';
import DateTimePicker from 'react-styled-date-time-picker';
import { DateTime } from 'luxon';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: DateTime.local(),
      dateTo: DateTime.local().plus({ day: 1 }),
      open: false,
    };
  }

  setDate = (dateFrom, dateTo) =>
    this.setState(() => ({ dateFrom, dateTo }), this.togglePicker);

  togglePicker = () => this.setState(({ open }) => ({ open: !open }));

  render() {
    const { open, dateFrom, dateTo } = this.state;

    return (
      <div>
        <input
          onClick={this.togglePicker}
          value={this.state.dateFrom.toFormat('dd/MM/yyyy HH:mm')}
          readOnly
        />
        <input
          onClick={this.togglePicker}
          value={this.state.dateTo.toFormat('dd/MM/yyyy HH:mm')}
          readOnly
        />
        <DateTimePicker
          dateFrom={dateFrom}
          dateTo={dateTo}
          open={open}
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

export default Test;
```

### Supported languages
- Russian
- English
- Italian
- Spanish
- Portuguese

### Dependencies
```
{
  "lodash.chunk": "^4.2.0",
  "lodash.range": "^3.2.0",
  "luxon": "^0.4.0",
  "react": "^16.0.0",
  "react-dom": "^16.0.0",
  "styled-components": "^3.1.6"
}
```
