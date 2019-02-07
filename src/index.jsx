// @flow
/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import { type DateTime } from 'luxon';
/** eslint-enable */

import Modal from './Modal';
import DateTimePicker from './DateTimePicker';

type Props = {
  open: boolean,
  label: string,
  value: DateTime,
  returnValue: DateTime,
  returnState: boolean,
  language: Language,
  onChange: Function,
  onSelect?: Function, // on OK click
  onClose: Function, // on Cancel or outside click
  labelStyle: Object,
};

class Picker extends PureComponent<Props> {
  static defaultProps = {
    onSelect: () => {},
  }

  render() {
    const {
      open, onClose, onChange, onSelect, value, label, labelStyle, returnValue,
      returnState, language,
    } = this.props;

    return open
      ? (
        <Modal onClose={onClose}>
          <DateTimePicker
            language={language}
            value={value}
            onChange={onChange}
            onSelect={onSelect}
            onClose={onClose}
            label={label}
            labelStyle={labelStyle}
            returnValue={returnValue}
            returnState={returnState}
          />
        </Modal>
      )
      : null;
  }
}

export default Picker;
