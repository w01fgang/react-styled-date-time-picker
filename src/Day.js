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
  hovered?: ?boolean,
  onMouseOver?: (e: Event) => void,
  onFocus?: (e: Event) => void,
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

type Props = {|
  +i: number,
  +w: number,
  +m: number,
  +selectDate: (day: number, week: number) => void,
  +onHover: (day: number, month: number) => void,
  +hovered: ?DateTime,
  +dateFrom: DateTime,
  +dateTo: DateTime,
  +disabled: boolean,
|};

class Day extends PureComponent<Props> {
  height = () => {
    const { i, m, onHover } = this.props;
    onHover(i, m);
  }

  handleClick = () => {
    const { i, w, selectDate } = this.props;
    selectDate(i, w);
  }

  render() {
    const {
      i, w, selectDate, dateFrom, disabled, dateTo, hovered, ...other
    } = this.props;
    const currentDate = getDate(i, w, returnState ? dateFrom : dateTo);
    const selected = (currentDate.day === dateFrom.day && currentDate.month === dateFrom.month && currentDate.year === dateFrom.year && i != null)
      || (currentDate.day === dateFrom.day && currentDate.month === dateFrom.month && currentDate.year === dateFrom.year && i != null);
    if (dateFrom && !selected && i != null) {
      if (disabled) {
        return (
          <Disabled
            {...other}
          >
            {i}
          </Disabled>
        );
      }

      if (currentDate > dateFrom && currentDate < dateFrom) {
        console.log('first');
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
      console.log('second');

      return (
        <Cell
          onFocus={this.height}
          onMouseOver={this.height}
          hovered={false}
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
