// @flow
/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import range from 'lodash.range';
import chunk from 'lodash.chunk';
import { DateTime } from 'luxon';
/** eslint-enable */
import Day from './Day';
import getDate from './getDate';

const getWeeks = (date: DateTime) => {
  const firstDay = date.startOf('week');
  return Array(7).fill(1).map((el, i) => firstDay.plus({ day: i }).weekdayShort);
};

const CalendarContainer = styled.div`
  display: ${props => (props.visible ? 'display: inline-block;' : 'none')};
`;

const Toolbar = styled.div`
  line-height: 30px;
  color: #00A15F;
  text-align: center;
  margin-bottom: 13px;
  display: flex;
  justify-content: space-between;
`;

const ButtonNext = styled.button`
  color: #999999;

  &:focus {
    outline: none;
  }
`;
const ButtonPrev = styled.button`
  color: #999999;

  &:focus {
    outline: none;
  }
`;

const CurrentDate = styled.span`
  color: #00A15F;
`;

const Table = styled.table`
  width: 270px;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
`;

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Td = styled.td`
  padding: 8px 0;
  text-align: center;
  cursor: pointer;
  color: #00A15F;
  border: 1px solid #dfe0e4;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  text-transform: capitalize;
`;

const TableBContainer = styled.div`

`
const MainButton = styled.button`
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

  &:before {
    margin-right: 6px;
  }
`;

type Props = {
  onChange: Function,
  switchTab: Function,
  value: DateTime,
  returnValue: DateTime,
  returnState: boolean,
  language: Language,
  visible: boolean,
  returnState: boolean,
};

class Calendar extends PureComponent<Props> {
  selectDate = (i: number, w: number) => {
    const {
      value, returnValue, returnState, onChange, switchTab, onSelect
    } = this.props;
    let date;
    if (returnState) {
      date = getDate(i, w, returnValue);
    } else {
      date = getDate(i, w, value);
    }
    const options = onChange(date);

    if ((!options || options.switchTab) && !returnState) {
      onSelect();
    } else {
      switchTab();
      onSelect();
    }
  }

  prevMonth = (e: Event) => {
    e.preventDefault();
    const {
      returnState, returnValue, value, onChange,
    } = this.props;
    if (returnState) {
      onChange(returnValue.minus({ month: 2 }));
    } else {
      onChange(value.minus({ month: 2 }));
    }
  }

  nextMonth = (e: Event) => {
    e.preventDefault();
    if (this.props.returnState) {
      this.props.onChange(this.props.returnValue.plus({ month: 2 }));
    } else {
      this.props.onChange(this.props.value.plus({ month: 2 }));
    }
  }

  handleConfirmClick = () => {
    this.props.handleConfirmClick()
  }

  handleCancelClick = () => {
    this.props.handleCancelClick()
  }

  render() {
    const {
      value, visible, language, returnValue, returnState,
    } = this.props;
    let d3;
    let d4;
    let d5;
    let d6;
    if (returnState) {
      d3 = returnValue.endOf('month').day;
      d4 = returnValue.plus({ month: 1 }).endOf('month').day;
    } else {
      d3 = value.endOf('month').day;
      d4 = value.plus({ month: 1 }).endOf('month').day;
    }
    
    d5 = value.set({ day: 1 }).weekday
    d6 = returnValue.plus({month: 1}).set({ day: 1 }).weekday
    let dd = [];
    let ds = [];
    for (let i = 0; i < d5 - 1; i++) {
      dd.push(null)
    }
    for (let i = 0; i < d6 - 1; i++) {
      ds.push(null);
    }
    const days = [
      ...dd,
      ...range(1, d3 + 1)
    ];

    const days1 = [
      ...ds,
      ...range(1, d4 + 1),
    ]
    return (
      <CalendarContainer visible={visible}>
        <Toolbar>
          <ButtonPrev type="button" className="prev-month" onClick={this.prevMonth}>
            {returnState ? returnValue.minus({ month: 1 }).monthShort : value.minus({ month: 1 }).monthShort}
          </ButtonPrev>
          <CurrentDate>
            {returnState ?
              returnValue.toLocaleString({ month: 'long', year: 'numeric' }) :
              value.toLocaleString({ month: 'long', year: 'numeric' })
            }
          </CurrentDate>
          <CurrentDate>
            {returnState ?
              returnValue.plus({ month: 1 }).toLocaleString({ month: 'long', year: 'numeric' }) :
              value.plus({ month: 1 }).toLocaleString({ month: 'long', year: 'numeric' })
            }
          </CurrentDate>
          <ButtonNext type="button" className="next-month" onClick={this.nextMonth}>
            {returnState ? returnValue.plus({ month: 2 }).monthShort : value.plus({ month: 2 }).monthShort}
          </ButtonNext>
        </Toolbar>
        <TableContainer>
          <TableBContainer>
            <Table>
              <thead>
                <tr>
                  {returnState ?
                    getWeeks(returnValue.setLocale(language)).map((w, i) => <Td key={`${i + w}`}>{w}</Td>) :
                    getWeeks(value.setLocale(language)).map((w, i) => <Td key={`${i + w}`}>{w}</Td>)
                  }
                </tr>
              </thead>

              <tbody>
                {chunk(days, 7).map((row, w) => (
                  <tr key={`week-${w + w}`}>
                    {row.map((i, index) => (
                      <Day
                        key={`day-${Math.random()}`}
                        i={i}
                        w={w}
                        value={value}
                        selectDate={this.selectDate}
                        returnValue={returnValue}
                        returnState={returnState}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <MainButton
              type="button"
              className="ion-checkmark"
              onClick={this.handleConfirmClick}
            >
              OK
            </MainButton>
          </TableBContainer>
          <TableBContainer>
            <Table>
              <thead>
                <tr>
                  {returnState ?
                    getWeeks(returnValue.setLocale(language)).map((w, i) => <Td key={`${i + w}`}>{w}</Td>) :
                    getWeeks(value.setLocale(language)).map((w, i) => <Td key={`${i + w}`}>{w}</Td>)
                  }
                </tr>
              </thead>

              <tbody>
                {chunk(days1, 7).map((row, w) => (
                  <tr key={`week-${w + w}`}>
                    {row.map(i => (
                      <Day
                        key={`day1-${Math.random()}`}
                        i={i}
                        w={w + 7}
                        value={value}
                        selectDate={this.selectDate}
                        returnValue={returnValue}
                        returnState={returnState}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <MainButton
              type="button"
              className="ion-checkmark"
              onClick={this.handleCancelClick}
            >
              Cancel
            </MainButton>
          </TableBContainer>
        </TableContainer>
      </CalendarContainer>
    );
  }
}

export default Calendar;
