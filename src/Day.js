// @flow
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import styled, { type StyledComponent } from 'styled-components';
import { DateTime } from 'luxon';
/** eslint-enable */

import getDate from './getDate';

type CellProps = {
  active?: boolean,
  inRange?: boolean,
  hovered?: boolean,
};

const Cell: StyledComponent<CellProps, {}, HTMLTableCellElement> = styled.td`
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

const Disabled: StyledComponent<CellProps, {}, React$ComponentType<*>> = styled(Cell)`
  color: #999;
`;

type Props = {
  i: number,
  w: number,
  selectDate: (day: number) => void,
  selected: boolean,
  dateFrom: DateTime,
  dateTo: DateTime,
  returnValueShow: DateTime,
  returnState: boolean,
  dateFrom: DateTime,
};

type State = {|
  +hovered: ?DateTime,
|};

class Day extends PureComponent<Props, State> {
  state = {
    hovered: null,
  };

  handleClick = () => {
    const { i, selectDate } = this.props;
    selectDate(i);
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
          <Disabled
            {...other}
          >
            {i}
          </Disabled>
        );
      }
      if (currentDate > dateFrom && currentDate < dateFrom) {
        return (
          <Cell
            inRange
            onClick={this.handleClick}
            {...other}
          >
            {i}
          </Cell>
        );
      }
    }

    if (i != null) {
      return (
        <Cell
          active={selected}
          onClick={this.handleClick}
          {...other}
        >
          {i}
        </Cell>
      );
    }
    return (
      <td />
    );
  }
}

export default Day;
