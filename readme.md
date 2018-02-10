## Minimal example

```javascript
import React, { Component } from 'react';
import DateTimePicker from 'react-styled-date-time-picker';
import { DateTime } from 'luxon';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: DateTime.local(),
      open: false,
    };
  }
  
  setDate = (date) => this.setState(() => ({ date }));
  
  togglePicker = () => this.setState(({ open }) => ({ open: !open }));
  
  render(){
    return (
      <div>
        <input
          onClick={this.togglePicker}
          value={this.state.date.toFormat('dd/MM/yyyy HH:mm')}
          readOnly
        />
        <DateTimePicker
          open={this.state.open}
          value={this.state.date}
          onChange={this.setDate}
          onClose={this.togglePicker}
          language="ru"
        />
      </div>
    );
  }
}

export default Test;
```

### Dependencies
```
{
  "lodash.chunk": "^4.2.0",
  "lodash.range": "^3.2.0",
  "luxon": "^0.4.0",
  "react": "^16.0.0",
  "react-page-click": "^4.0.2",
  "styled-components": "^3.1.6"
}
```