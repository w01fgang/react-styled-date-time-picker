// @flow
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import { type DateTime } from 'luxon';
/** eslint-enable */

import Modal from './Modal';
import DateTimePicker from './DateTimePicker';

type Props = {|
  /* Date picker open/close state */
  +open: boolean,
  /* Label at the top of date picker window */
  label?: string,
  +dateFrom: DateTime,
  +dateTo: DateTime,
  /* UI language */
  language?: Language,
  /* Called when user changes on the day of time */
  onChange?: (firstDate: DateTime, secondDate: DateTime) => void,
  /* Called when user click OK */
  +onSelect: (firstDate: DateTime, secondDate: DateTime) => void,
  /* Called when user closes the picker */
  onClose: () => void,
  labelStyle?: $Shape<CSSStyleDeclaration>,
  /* Close if user clicked outside of the date picker window */
  closeOnOutsideClick?: boolean,
|};

class Picker extends PureComponent<Props> {
  static defaultProps = {
    language: 'en',
    onChange: null,
    label: '',
    labelStyle: {},
    closeOnOutsideClick: true,
  }

  render() {
    const {
      open, onClose, closeOnOutsideClick, ...other
    } = this.props;
    console.log('Picker this.props', this.props);

    if (!open) {
      return null;
    }

    return (
      <Modal closeOnOutsideClick={closeOnOutsideClick} onClose={onClose}>
        <DateTimePicker {...other} onClose={onClose} />
      </Modal>
    );
  }
}

export default Picker;
