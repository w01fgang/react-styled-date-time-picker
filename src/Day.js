// @flow
/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import styled, { type StyledComponent } from 'styled-components';
import { DateTime } from 'luxon';
/** eslint-enable */

import getDate from './getDate';

type TdProps = {
  active?: boolean,
  inRange?: boolean,
};

const Td: StyledComponent<TdProps, {}, HTMLTableCellElement> = styled.td`
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

const DisabledTd: StyledComponent<TdProps, {}, React$ComponentType<*>> = styled(Td)`
  color: #999;
`;

type Props = {
  i: number,
  w: number,
  selectDate: Function,
  dateFrom: DateTime,
  dateTo: DateTime,
  returnValueShow: DateTime,
  returnState: boolean,
  dateFrom: DateTime,
};

class Day extends PureComponent<Props> {
  handleClick = () => {
    const { i, w, selectDate } = this.props;
    selectDate(i, w);
  }

  render() {
    const {
      i, w, selectDate, dateFrom, returnState, dateTo, returnValueShow, ...other
    } = this.props;
    const currentDate = getDate(i, w, returnState ? returnValueShow : dateTo);
    const selected = (currentDate.day === dateFrom.day && currentDate.month === dateFrom.month && currentDate.year === dateFrom.year && i != null)
      || (currentDate.day === dateFrom.day && currentDate.month === dateFrom.month && currentDate.year === dateFrom.year && i != null);
    if (dateFrom && !selected && i != null) {
      const realDate = returnState ? dateFrom : DateTime.local();

      if (currentDate < realDate && returnState) {
        return (
          <DisabledTd
            {...other}
          >
            {i}
          </DisabledTd>
        );
      }
      if (currentDate > dateFrom && currentDate < dateFrom) {
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
    }
    return (
      <td />
    );
  }
}

export default Day;
