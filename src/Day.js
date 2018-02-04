// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Td = styled.td`
  padding: 8px 0;
  text-align: center;
  cursor: pointer;
  color: ${props => (props.active ? '#f8f8f8' : '#191F26')};
  background-color: ${props => (props.active ? '#00A15F' : '#f8f8f8')};
  border: 1px solid #dfe0e4;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
`;

const DisabledTd = Td.extend`
  color: #999;
`;

type Props = {
  i: number,
  w: number,
  d: number,
  selectDate: Function,
};

class Day extends PureComponent<Props> {
  handleClick = () => {
    const { i, w, selectDate } = this.props;
    selectDate(i, w);
  }
  
  render() {
    const {
      i, w, selectDate, ...other 
    } = this.props;
    const prevMonth = (w === 0 && i > 7);
    const nextMonth = (w >= 4 && i <= 14);

    if (prevMonth || nextMonth) return <DisabledTd onClick={this.handleClick} {...other}>{i}</DisabledTd>;

    return <Td active={(i === this.props.d)} onClick={this.handleClick} {...other}>{i}</Td>;
  }
}

export default Day;
