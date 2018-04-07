// @flow
/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import getDate from './GetDate';
/** eslint-enable */

const Td = styled.td`
  padding: 5px 0;
  text-align: center;
  cursor: pointer;
  color: ${props => (props.active || props.overed ? '#f8f8f8' : '#191F26')};
  background-color: ${(props) => {
    if (props.overed) {
      return '#00844e';
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

const DisabledTd = Td.extend`
  color: #999;
`;

type Props = {
  i: number,
  w: number,
  d: number,
  selectDate: Function,
  mouseOver: Function,
  markDate: DateTime,
  value: DateTime,
  overedDate: DateTime,
};

class Day extends PureComponent<Props> {
  onMouseOver = () => {
    const { i, w, mouseOver } = this.props;
    mouseOver(i, w);
  }

  handleClick = () => {
    const { i, w, selectDate } = this.props;
    selectDate(i, w);
  }
  
  render() {
    const {
      i, w, selectDate, markDate, value, overedDate, ...other
    } = this.props;
    const prevMonth = (w === 0 && i > 7);
    const nextMonth = (w >= 4 && i <= 14);
    const thisDate = getDate(i, w, value);
    const overed = (thisDate > markDate && thisDate < overedDate); 

    if (thisDate < markDate) {
      return (
        <DisabledTd 
          {...other}
        >
          {i}
        </DisabledTd>
      );
    }

    if ((prevMonth || nextMonth) && !overed) {
      return (
        <DisabledTd 
          onClick={this.handleClick}
          onMouseOver={this.onMouseOver}
          onFocus={this.onMouseOver}
          {...other}
        >
          {i}
        </DisabledTd>
      );
    }

    return (
      <Td
        active={(i === this.props.d)}
        onClick={this.handleClick}
        onMouseOver={this.onMouseOver}
        onFocus={this.onMouseOver}
        {...other}
        overed={overed}
      >
        {i}
      </Td>
    );
  }
}

export default Day;
