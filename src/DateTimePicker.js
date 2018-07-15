// @flow
/* eslint-disable import/no-unresolved, import/extensions */
import React, { Component } from 'react';
import styled from 'styled-components';
import { type DateTime } from 'luxon';
/** eslint-enable */
import Calendar from './Calendar';
import Time from './Time';

const Container = styled.div`
  display: inline-block;
  width: 270px;
  padding: 12px 15px;
  border-radius: 3px;
  border: 1px solid #dfe0e4;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.9);
`;

const Options = styled.div`
  width: 100%;
  display: inline-block;
  margin-bottom: 4px;
`;

const Button = styled.button`
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

const Tabs = styled.div`
  margin-bottom: 11px;
`;

const OkButton = styled.button`
  border: 0;
  outline: 0;
  cursor: pointer;
  line-height: 1;
  display: block;
  margin-top: 10px;
  width: 100%;
  background-color: #00A15F;
  padding: 12px 0;
  text-align: center;
  color: #f8f8f8;
  font-size: 16px;
  border-radius: 3px;

  &:before {
    margin-right: 6px;
  }
`;

const Label = styled.div`
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

type Props = {
  onChange: Function,
  onClose: Function,
  value: DateTime,
  returnValue: DateTime,
  returnState: boolean,
  language: Language,
  label: string,
  labelStyle: Object,
};

type State = {
  tab: 0 | 1,
};

class DateTimePicker extends Component<Props, State> {
  static defaultProps = {
    language: 'en',
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      tab: 0,
    };
  }

  handleClickTab = (tab: 0 | 1, e: Event) => {
    if (e) e.preventDefault();
    this.setState(() => ({ tab }));
  }

  switchTabOne = (e: Event) => this.handleClickTab(0, e);
  switchTabTwo = (e: Event) => this.handleClickTab(1, e);

  handleClose = () => {
    this.setState({
      tab: 0,
    });
    this.props.onClose();
  }

  render() {
    const { tab } = this.state;
    const {
      value, language, label, labelStyle, returnValue, returnState,
    } = this.props;

    return (
      <Container>
        { label &&
          <Label style={labelStyle}>{label}</Label>
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
            language={this.props.language}
            visible={tab === 0}
            value={value}
            onChange={this.props.onChange}
            switchTab={this.switchTabTwo}
            returnValue={returnValue}
            returnState={returnState}
          />
          <Time
            language={this.props.language}
            visible={tab === 1}
            value={value}
            onChange={this.props.onChange}
            returnValue={returnValue}
            returnState={returnState}
          />
        </Tabs>

        <OkButton type="button" className="ion-checkmark" onClick={this.handleClose}>
          OK
        </OkButton>
      </Container>
    );
  }
}

export default DateTimePicker;
