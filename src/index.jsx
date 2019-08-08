// @flow
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { type DateTime } from 'luxon';
/** eslint-enable */

import Modal from './Modal';
import DateTimePicker from './DateTimePicker';

type Props = {|
  id?: ?string,
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
    id: null,
    language: 'en',
    onChange: null,
    label: '',
    labelStyle: {},
    closeOnOutsideClick: true,
  }

  root: ?HTMLDivElement;

  componentDidMount() {
    const { id } = this.props;
    const div = document.createElement('div');
    div.id = id || 'react-stiled-date-time-picker';
    if (document.body) {
      document.body.appendChild(div);
    }
    this.root = div;
  }

  render() {
    const {
      open, onClose, closeOnOutsideClick, id, ...other
    } = this.props;

    if (!open || !this.root) {
      return null;
    }

    return ReactDOM.createPortal(
      (
        <Modal closeOnOutsideClick={closeOnOutsideClick} onClose={onClose}>
          <DateTimePicker {...other} onClose={onClose} />
        </Modal>
      ),
      this.root,
    );
  }
}

export default Picker;
