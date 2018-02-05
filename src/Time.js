// @flow
/* eslint-disable import/no-unresolved, import/extensions */
import React, { Component } from 'react';
import styled from 'styled-components';
import { type DateTime } from 'luxon';
/** eslint-enable */

import Arrow from './Arrow';

const TimeContainer = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  color: #fff;
  height: 320px;
  & div {
        user-select: none;
  }
`;

const TimeInputContainer = styled.div`
  text-align: center;
`;

const Label = styled.span`
  display: ${props => (props.visible ? 'inline-block' : 'none')};
  width: 65px;
  height: 65px;
  font-size: 38px;
  line-height: 65px;
  background-color: #00A15F;
  border-radius: 3px;
  text-align: center;
  font-family: Roboto;  
`;

const Input = styled.input`
  display: ${props => (props.show ? 'inline-block' : 'none')};
  width: 65px;
  height: 65px;
  font-size: 38px;
  line-height: 65px;
  background-color: #00A15F;
  border-radius: 3px;
  text-align: center;
  -webkit-appearance: none;
  color: #fff;
  border: 0;
  padding: 0;
  margin: 0;
  vertical-align: baseline;
  outline: 0;
  font-family: Roboto;
`;

const Separater = styled.span`
  display: inline-block;
  font-size: 32px;
  font-weight: bold;
  color: #00A15F;
  width: 32px;
  height: 65px;
  line-height: 65px;
  text-align: center;
`;

const FlexRow = styled.div`
  flex: 0 0 100%;
`;

const ArrowContainer = styled.span`
  margin: 0 16px;
`;

const ArrowDownContainer = ArrowContainer.extend`
  & svg {
    transform: rotate(180deg);
  }
`;

type Position = {
  x: number,
  y: number,
}

type Props = {
  visible: boolean,
  value: DateTime,
  onChange: Function,
};

type State = {
  editHours: boolean,
  editMinutes: boolean,
};

class Time extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editHours: false,
      editMinutes: false,
    };
  }
 
  getHours = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = this.props;
    const date = value.set({ hours: parseInt(e.target.value, 10) });
    this.props.onChange(date);
    this.editHours();
  }
  
  getMinutes = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = this.props;
    const date = value.set({ minutes: parseInt(e.target.value, 10) });
    this.props.onChange(date);
    this.editMinutes();
  }

  editHours = () => {
    this.setState({ editHours: !this.state.editHours });
    
    setTimeout(() => {
      if (this.hours) this.hours.focus();
    }, 0);
  }

  editMinutes = () => {
    this.setState({ editMinutes: !this.state.editMinutes });
    setTimeout(() => {
      if (this.minutes) this.minutes.focus();
    }, 0);
  }

  hours: ?HTMLInputElement;
  minutes: ?HTMLInputElement;

  changeMinutes = (pos: Position) => {
    this.setState(() => ({ editMinutes: false }));
    const { value } = this.props;
    const date = value.set({ minutes: parseInt(pos.x, 10) });
    this.props.onChange(date);
  }
  
  changeHours = (pos: Position) => {
    this.setState(() => ({ editHours: false }));
    const { value } = this.props;
    const date = value.set({ hours: parseInt(pos.x, 10) });
    this.props.onChange(date);
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
  
  render() {
    const { editHours, editMinutes } = this.state;
    
    const { value, visible } = this.props;
    return (
      <TimeContainer visible={visible}>
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
              defaultValue={value.hour}
              onBlur={this.getHours}
              min={0}
              max={23}
              innerRef={(node) => { this.hours = node; }}
              show={editHours}
            />
            <Label visible={!editHours} onClick={this.editHours}>
              {value.hour}
            </Label>
            <Separater>:</Separater>
            <Input
              type="text"
              className="time"
              defaultValue={value.minute}
              onBlur={this.getMinutes}
              min={0}
              max={23}
              innerRef={(node) => { this.minutes = node; }}
              show={editMinutes}
            />
            <Label visible={!editMinutes} onClick={this.editMinutes}>
              {value.minute}
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
      </TimeContainer>
    );
  }
}

export default Time;
