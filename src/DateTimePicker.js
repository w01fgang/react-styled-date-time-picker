// @flow
/* eslint-disable import/no-unresolved, import/extensions */
import React, { Component } from 'react';
import styled, { type StyledComponent } from 'styled-components';
import { type DateTime } from 'luxon';
/** eslint-enable */
import Calendar from './Calendar';
import Time from './Time';

const Container: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
  display: inline-block;
  width: 585px;
  padding: 12px 15px;
  border-radius: 3px;
  border: 1px solid #dfe0e4;
  margin-top: 20px;
  background: rgba(255, 255, 255, 1);
`;

const TimeContainer: StyledComponent<{ visible: boolean }, {}, HTMLDivElement> = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-around;
  color: #f8f8f8;
  height: 320px;
  & div {
        user-select: none;
  }
`;

const Options: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
  width: 100%;
  display: inline-block;
  margin-bottom: 4px;
`;

const Button: StyledComponent<{ active: boolean }, {}, HTMLButtonElement> = styled.button`
  float: left;
  width: 50%;
  color: ${props => (props.active ? '#f8f8f8' : '#00A15F')};
  background-color: ${props => (props.active ? '#00A15F' : 'transparent')};
  text-align: center;
  font-size: 16px;
  padding: 7px;
  border: 1px solid #00A15F;
  border-radius: 3px;

  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:focus {
    outline: none;
  }
`;

const Tabs: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
  margin-bottom: 11px;
`;

const Label: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
  margin: 10px auto;
  margin-top: 0;
  text-align: center;
`;

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

type Props = {|
  /* Called when user changes on the day of time */
  onChange?: (dateFrom: DateTime, dateTo: DateTime) => void,
  /* Called when user click OK */
  +onSelect: (dateFrom: DateTime, dateTo: DateTime) => void,
  /* Called when user closes the picker */
  +onClose: () => void,
  +dateFrom: DateTime,
  +dateTo: DateTime,
  language?: Language,
  label?: string,
  labelStyle?: $Shape<CSSStyleDeclaration>,
|};

type State = {|
  +tab: 0 | 1,
  +dateFrom: DateTime,
  +dateTo: DateTime,
|};

class DateTimePicker extends Component<Props, State> {
  static defaultProps = {
    language: 'en',
    onChange: null,
    label: '',
    labelStyle: {},
  }

  constructor(props: Props) {
    super(props);
    const { dateFrom, dateTo } = props;
    console.log('DateTimePicker props', props);
    this.state = {
      tab: 0,
      dateFrom,
      dateTo,
    };
  }

  switchTabOne = () => this.setState(() => ({ tab: 0 }));

  switchTabTwo = () => this.setState(() => ({ tab: 1 }));

  handleTimeFrom = (dateFrom: DateTime) => {
    this.setState(() => ({ dateFrom }));
  }

  handleTimeTo = (dateTo: DateTime) => {
    this.setState(() => ({ dateTo }));
  }

  handleChange = (dateFrom: DateTime, dateTo: DateTime) => this.setState(() => ({ dateFrom, dateTo }));

  render() {
    const {
      tab, dateFrom, dateTo,
    } = this.state;
    const {
      language, label, labelStyle, onClose,
    } = this.props;

    return (
      <Container>
        { label
          && <Label style={labelStyle}>{label}</Label>
        }
        <Options>
          <Button
            type="button"
            onClick={this.switchTabOne}
            active={tab === 0}
          >
            {labels[language].date}
          </Button>
          <Button
            type="button"
            onClick={this.switchTabTwo}
            active={tab === 1}
          >
            {labels[language].time}
          </Button>
        </Options>

        <Tabs>
          <Calendar
            language={language}
            visible={tab === 0}
            dateFrom={console.log('dateFrom', dateFrom) || dateFrom}
            dateTo={dateTo}
            onChange={this.handleChange}
            switchTab={this.switchTabTwo}
            onSelect={this.handleConfirmClick}
            cancel={onClose}
          />

          <TimeContainer visible={tab === 1}>
            <Time value={dateFrom} onChange={this.handleTimeFrom} />
            <Time value={dateTo} onChange={this.handleTimeTo} />
          </TimeContainer>
        </Tabs>
      </Container>
    );
  }
}

export default DateTimePicker;
