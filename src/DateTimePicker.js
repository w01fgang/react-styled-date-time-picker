// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { type DateTimeUnit } from 'luxon';
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
  color: ${props => (props.active ? '#fff' : '#CC2262')};
  background-color: ${props => (props.active ? '#CC2262' : 'transparent')};
  text-align: center;
  font-size: 16px;
  padding: 7px;
  border: 1px solid #CC2262;
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
  background-color: #CC2262;
  padding: 12px 0;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  border-radius: 3px;

  &:before {
    margin-right: 6px;
  }
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
  onSave: Function,
  value: DateTimeUnit,
  language: Language,
};

type State = {
  tab: 0 | 1,
};

class Form extends Component<Props, State> {
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

  handleSave = (e: Event) => {
    if (e) e.preventDefault();
    this.props.onChange();
    if (this.props.onSave) this.props.onSave();
  }

  switchTabOne = (e: Event) => this.handleClickTab(0, e);
  switchTabTwo = (e: Event) => this.handleClickTab(1, e);

  render() {
    const { tab } = this.state;
    const { moment, language } = this.props;

    return (
      <Container>
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
            moment={moment}
            onChange={this.props.onChange}
            switchTab={this.switchTabTwo}
          />
          <Time
            language={this.props.language}
            visible={tab === 1}
            moment={moment}
            onChange={this.props.onChange}
          />
        </Tabs>

        <OkButton type="button" className="ion-checkmark" onClick={this.handleSave}>
          OK
        </OkButton>
      </Container>
    );
  }
}

export default Form;
