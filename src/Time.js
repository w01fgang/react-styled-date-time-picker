// @flow
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { Component } from 'react';
import styled, { type StyledComponent } from 'styled-components';
import { type DateTime } from 'luxon';
/** eslint-enable */

import Arrow from './Arrow';

const TimeInputContainer: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
  text-align: center;
`;

const Label: StyledComponent<{ visible: boolean }, {}, HTMLSpanElement> = styled.span`
  display: ${props => (props.visible ? 'inline-block' : 'none')};
  width: 65px;
  height: 65px;
  font-size: 38px;
  line-height: 65px;
  background-color: #00A15F;
  border-radius: 3px;
  text-align: center;
  font-family: Roboto;
  cursor: pointer;
`;

const Input: StyledComponent<{ show: boolean }, {}, HTMLInputElement> = styled.input`
  display: ${props => (props.show ? 'inline-block' : 'none')};
  width: 65px;
  height: 65px;
  font-size: 38px;
  line-height: 65px;
  background-color: #00A15F;
  border-radius: 3px;
  text-align: center;
  -webkit-appearance: none;
  color: #f8f8f8;
  border: 0;
  padding: 0;
  margin: 0;
  vertical-align: baseline;
  outline: 0;
  font-family: Roboto;
`;

const Separator: StyledComponent<{}, {}, HTMLSpanElement> = styled.span`
  display: inline-block;
  font-size: 32px;
  font-weight: bold;
  color: #00A15F;
  width: 32px;
  height: 65px;
  line-height: 65px;
  text-align: center;
`;

const FlexRow: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
  flex: 0 0 100%;
`;

const ArrowContainer: StyledComponent<{}, {}, HTMLSpanElement> = styled.span`
  margin: 0 16px;

  & svg {
    cursor: pointer;
  }
`;

const ArrowDownContainer = styled(ArrowContainer)`
  & svg {
    transform: rotate(180deg);
  }
`;

const addZeroInFront = (value: number): string => (
  value >= 0 && value < 10
    ? `0${value}`
    : String(value)
);

type Props = {|
  +value: DateTime,
  +onChange: (date: DateTime) => void,
|};

type State = {|
  +editHours: boolean,
  +editMinutes: boolean
|};

class Time extends Component<Props, State> {
  state = {
    editHours: false,
    editMinutes: false,
  };

  getHours = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      value, onChange,
    } = this.props;

    const date = value.set({ hours: parseInt(e.target.value, 10) });
    onChange(date);
    this.editHours();
  }

  getMinutes = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      value, onChange,
    } = this.props;

    const date = value.set({ minutes: parseInt(e.target.value, 10) });
    onChange(date);
    this.editMinutes();
  }

  editHours = () => {
    this.setState(state => ({ editHours: !state.editHours }));

    setTimeout(() => {
      if (this.hours) this.hours.focus();
    }, 0);
  }

  editMinutes = () => {
    this.setState(state => ({ editMinutes: !state.editMinutes }));
    setTimeout(() => {
      if (this.minutes) this.minutes.focus();
    }, 0);
  }

  hoursUp = () => {
    const { value, onChange } = this.props;
    onChange(value.plus({ hour: 1 }));
  }

  hoursDown = () => {
    const { value, onChange } = this.props;
    onChange(value.minus({ hour: 1 }));
  }

  minutesUp = () => {
    const { value, onChange } = this.props;
    onChange(value.plus({ minute: 1 }));
  }

  minutesDown = () => {
    const { value, onChange } = this.props;
    onChange(value.minus({ minute: 1 }));
  }

  hours: ?HTMLInputElement;

  minutes: ?HTMLInputElement;

  render() {
    const { editHours, editMinutes } = this.state;
    const { value } = this.props;
    return (
      <TimeInputContainer>
        <FlexRow>
          <ArrowContainer>
            <Arrow height="65" width="65" onClick={this.hoursUp} />
          </ArrowContainer>
          <ArrowContainer>
            <Arrow height="65" width="65" onClick={this.minutesUp} />
          </ArrowContainer>
        </FlexRow>
        <FlexRow>
          <Input
            type="text"
            key={1}
            defaultValue={value.hour}
            onBlur={this.getHours}
            min={0}
            max={23}
            ref={(node) => { this.hours = node; }}
            show={editHours}
          />
          <Label visible={!editHours} onClick={this.editHours}>
            {value.hour}
          </Label>
          <Separator>:</Separator>
          <Input
            type="text"
            key={2}
            className="time"
            defaultValue={value.minute}
            onBlur={this.getMinutes}
            min={0}
            max={23}
            ref={(node) => { this.minutes = node; }}
            show={editMinutes}
          />
          <Label visible={!editMinutes} onClick={this.editMinutes}>
            {addZeroInFront(value.minute)}
          </Label>
        </FlexRow>
        <FlexRow>
          <ArrowDownContainer>
            <Arrow height="65" width="65" onClick={this.hoursDown} />
          </ArrowDownContainer>
          <ArrowDownContainer>
            <Arrow height="65" width="65" onClick={this.minutesDown} />
          </ArrowDownContainer>
        </FlexRow>
      </TimeInputContainer>
    );
  }
}

export default Time;
