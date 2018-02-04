// @flow
import React, { PureComponent } from 'react';
// import type Moment from 'moment';
import { type DateTimeUnit } from 'luxon';
import moment from 'moment';

import Modal from './Modal';
import DateTimePicker from './DateTimePicker';

type Props = {
  open: boolean,
  value: DateTimeUnit,
  language: Language,
  onChange: Function,
  onClose: Function,
};

class Picker extends PureComponent<Props> {
  handleChange = (date: Date) => {
    this.props.onChange(date);
  }
  
  handleSave = (date: Date) => {
    this.props.onChange(date);
    this.props.onClose();
  }
  
  render() {
    const { open, onClose, value } = this.props;
    return open ?
      <Modal onClose={onClose}>
        <DateTimePicker
          language={this.props.language}
          value={value}
          onChange={this.handleChange}
          onSave={this.handleSave}
        />
      </Modal>
      :
      null;
  }
}

export default Picker;
