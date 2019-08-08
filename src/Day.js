// @flow
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import styled, { type StyledComponent } from 'styled-components';
import { DateTime } from 'luxon';
/** eslint-enable */

const equalDates = (d1: DateTime, d2: DateTime) => d1.hasSame(d2, 'day') && d1.hasSame(d2, 'month') && d1.hasSame(d2, 'year');

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
    if (props.active) {
      return '#008950';
    }
    if (props.inRange) {
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
  +date: DateTime,
  +i: number,
  +selectDate: (date: DateTime) => void,
  +onHover: (date: DateTime) => void,
  +hovered: ?DateTime,
  +dateFrom: DateTime,
  +dateTo: DateTime,
  +disabled: boolean,
|};

class Day extends PureComponent<Props> {
  height = () => {
    const { date, onHover } = this.props;
    onHover(date);
  }

  handleClick = () => {
    const { date, selectDate } = this.props;
    selectDate(date);
  }

  render() {
    const {
      i, selectDate, dateFrom, disabled, dateTo, hovered, date, onHover, ...other
    } = this.props;
    const selected = equalDates(date, dateFrom) || equalDates(date, dateTo);

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

      if (+date > +dateFrom && +date < +dateTo) {
        return (
          <Cell
            inRange
            active={selected}
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
          onFocus={this.height}
          onMouseEnter={this.height}
          hovered={Boolean(hovered)}
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
