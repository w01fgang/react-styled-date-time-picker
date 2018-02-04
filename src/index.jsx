// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import type Moment from 'moment';

const labels = {
  ru: {
    date: 'Дата',
    time: 'Время',
  },
  en: {
    date: 'Date',
    time: 'Time',
  },
  it: {
    date: 'Data',
    time: 'Tempo',
  },
  es: {
    date: 'Fecha',
    time: 'Tiempo',
  },
  pt: {
    date: 'Data',
    time: 'Hora',
  },
};

type Props = {
  open: boolean,
  value: Moment,
  language: 'ru' | 'en' | 'it' | 'es' | 'pt',
  onChange: Function,
};

class DateTimePicker extends PureComponent<Props> {
  handleClick = () => {}
  render() {
    return <div>DateTimePicker</div>;
  }
}

export default DateTimePicker;
