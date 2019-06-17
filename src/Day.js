// @flow
/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import getDate from './getDate';

/** eslint-enable */

const Td = styled.td`
  padding: 5px 0;
  text-align: center;
  cursor: pointer;
  color: ${props => (props.active || props.inRange ? '#f8f8f8' : '#191F26')};
  background-color: ${(props) => {
    if (props.inRange) {
      return '#008950';
    }
    if (props.active) {
      return '#00A15F';
    }
    return '#f8f8f8';
  }};
  border: 1px solid #dfe0e4;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};

  &:hover {
    background-color: #00A15F;
    color: #f8f8f8;
  }
`;

const DisabledTd = styled(Td)`
  color: #999;
`;

type Props = {
  i: number,
  w: number,
  selectDate: Function,
  returnValue: DateTime,
  returnState: boolean,
  value: DateTime,
};

class Day extends PureComponent<Props> {
  handleClick = () => {
    const { i, w, selectDate } = this.props;
    selectDate(i, w);
  }

  render() {
    const {
      i, w, selectDate, returnValue, value, returnState, valueShow, returnValueShow, ...other
    } = this.props;
    const currentDate = getDate(i, w, returnState ? returnValueShow : valueShow);
    const selected =
      (currentDate.day === returnValue.day && currentDate.month === returnValue.month && i != null) ||
      (currentDate.day === value.day && currentDate.month === value.month && i != null);
    if (returnValue && !selected && i != null) {
      const realDate = returnState ? value : DateTime.local();
      
      if (currentDate < realDate && returnState) {
        return (
          <DisabledTd
            {...other}
          >
            {i}
          </DisabledTd>
        );
      }
      if (currentDate > value && currentDate < returnValue) {
        return (
          <Td
            inRange
            onClick={this.handleClick}
            {...other}
          >
            {i}
          </Td>
        );
      }
    }
    
    if (i != null) {
      return (
        <Td
          active={selected}
          onClick={this.handleClick}
          {...other}
        >
          {i}
        </Td>
      );
    } else {
      return (
        <td></td>
      )
    }
  }
}

export default Day;
