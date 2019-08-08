// @flow
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies, import/no-extraneous-dependencies */
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
  height: 250px;

  & div {
        user-select: none;
  }
`;

const Options: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
  width: 100%;
  display: inline-block;
  margin-bottom: 4px;
`;

const TabButton: StyledComponent<{ active: boolean }, {}, HTMLButtonElement> = styled.button`
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

const Button = styled.button`
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
  flex: 0 0 250px;

  &:before {
    margin-right: 6px;
  }
`;

const messages = {
  ru: {
    date: 'Дата',
    time: 'Время',
    cancel: 'Отмена',
    ok: 'Ок',
  },
  en: {
    date: 'Date',
    time: 'Time',
    cancel: 'Cancel',
    ok: 'OK',
  },
  it: {
    date: 'Data',
    time: 'Tempo',
    cancel: 'Cancella',
    ok: 'OK',
  },
  es: {
    date: 'Fecha',
    time: 'Tiempo',
    cancel: 'Cancelar',
    ok: 'OK',
  },
  pt: {
    date: 'Data',
    time: 'Hora',
    cancel: 'Cancelar',
    ok: 'OK',
  },
};

type Messages = {|
  +date: string,
  +time: string,
  +cancel: string,
  +ok: string,
|};

const getLabels = (lang: string = 'en'): Messages => messages[lang];

const Actions = styled.div`
  display: flex;
  margin: 0 -15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 0 50%;
`;

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
    const { dateFrom, dateTo, language } = props;
    this.state = {
      tab: 0,
      /* $flow: don't see defaultProps */
      dateFrom: dateFrom.setLocale(language),
      /* $flow: don't see defaultProps */
      dateTo: dateTo.setLocale(language),
    };
  }

  selectDate = () => {
    const { onSelect, onClose } = this.props;
    const { dateFrom, dateTo } = this.state;
    onSelect(dateFrom, dateTo);
    onClose();
  }

  switchTabOne = () => this.setState(() => ({ tab: 0 }));

  switchTabTwo = () => this.setState(() => ({ tab: 1 }));

  handleTimeFrom = (dateFrom: DateTime) => {
    const { onChange, dateTo } = this.props;
    if (onChange) {
      onChange(dateFrom, dateTo);
    }
    this.setState(() => ({ dateFrom }));
  }

  handleTimeTo = (dateTo: DateTime) => {
    const { onChange, dateFrom } = this.props;
    if (onChange) {
      onChange(dateFrom, dateTo);
    }
    this.setState(() => ({ dateTo }));
  }

  handleChange = (dateFrom: DateTime, dateTo: DateTime) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(dateFrom, dateTo);
    }
    this.setState(() => ({ dateFrom, dateTo }));
  }

  handleConfirmClick = (dateFrom: DateTime, dateTo: DateTime) => this.setState(() => ({ dateFrom, dateTo }));

  render() {
    const {
      tab, dateFrom, dateTo,
    } = this.state;
    const {
      language, label, labelStyle, onClose,
    } = this.props;

    const labels = getLabels(language);

    return (
      <Container>
        {label && <Label style={labelStyle}>{label}</Label>}

        <Options>
          <TabButton
            type="button"
            onClick={this.switchTabOne}
            active={tab === 0}
          >
            {labels.date}
          </TabButton>
          <TabButton
            type="button"
            onClick={this.switchTabTwo}
            active={tab === 1}
          >
            {labels.time}
          </TabButton>
        </Options>

        <Tabs>
          <Calendar
              /* $flow: don't see defaultProps */
            language={language}
            visible={tab === 0}
            dateFrom={dateFrom}
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
        <Actions>
          <ButtonContainer>
            <Button onClick={this.selectDate}>{labels.ok}</Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button onClick={onClose}>{labels.cancel}</Button>
          </ButtonContainer>
        </Actions>
      </Container>
    );
  }
}

export default DateTimePicker;
