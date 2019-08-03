// @flow
/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import styled, { type StyledComponent } from 'styled-components';
import chunk from 'lodash.chunk';
import { DateTime } from 'luxon';
/** eslint-enable */
import Day from './Day';
import getDate from './getDate';

const getWeeks = (date: DateTime) => {
  const firstDay = date.startOf('week');
  return Array(7).fill(1).map((el, i) => firstDay.plus({ day: i }).weekdayShort);
};

const CalendarContainer: StyledComponent<{ visible: boolean }, {}, HTMLDivElement> = styled.div`
  display: ${props => (props.visible ? 'display: inline-block;' : 'none')};
`;

const Toolbar: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
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
  min-height: 206px;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
`;

const TableContainer: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
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

const TableBContainer: StyledComponent<{}, {}, HTMLDivElement> = styled.div``;
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
  +dateFrom: DateTime,
  +dateTo: DateTime,
  +onChange: (dateFrom: DateTime, dateTo: DateTime) => void,
  +switchTab: () => void,
  +language: Language,
  +visible: boolean,
};

type State = {
  first: boolean,
};

class Calendar extends PureComponent<Props, State> {
  static defaultProps = {
    returnState: false,
    value: DateTime.local(),
    returnValue: DateTime.local(),
    valueShow: DateTime.local(),
    returnValueShow: DateTime.local(),
    onSelect: console.log,
    onChangeShow: console.log,
    handleConfirmClick: console.log,
    handleCancelClick: console.log,
  }

  state = {
    first: true,
  };

  selectDate = (i: number, w: number) => {
    const { dateFrom, dateTo, onChange } = this.props;

    const { first } = this.state;

    if (first) {
      onChange(getDate(i, w, dateFrom), dateTo);
    } else {
      onChange(dateFrom, getDate(i, w, dateTo));
    }
    this.setState(state => ({ first: !state.first }));
  }

  prevMonth = (e: Event) => {
    e.preventDefault();
    const { valueShow, onChangeMonth } = this.props;

    const date = valueShow.set({ day: 1 });
    onChangeMonth(date.minus({ month: 2 }));
  }

  nextMonth = (e: Event) => {
    e.preventDefault();
    const { valueShow, onChangeMonth } = this.props;
    const date = valueShow.set({ day: 1 });
    onChangeMonth(date.plus({ month: 2 }));
  }

  render() {
    const {
      value, visible, language, returnValue, returnState, valueShow, returnValueShow, handleConfirmClick, handleCancelClick,
    } = this.props;

    const { dateFrom, dateTo } = this.state;

    let d3;
    let d4;
    if (returnState) {
      d3 = returnValueShow.endOf('month').day;
      d4 = returnValueShow.plus({ month: 1 }).endOf('month').day;
    } else {
      d3 = valueShow.endOf('month').day;
      d4 = valueShow.plus({ month: 1 }).endOf('month').day;
    }

    const d5 = valueShow.set({ day: 1 }).weekday;
    const d6 = returnValueShow.plus({ month: 1 }).set({ day: 1 }).weekday;
    const dd = new Array(d5 - 1).fill(null);
    const ds = new Array(d6 - 1).fill(null);
    const days = [
      ...dd,
      ...new Array(d3).fill(1).map((_, el) => el + 1),
    ];

    const days1 = [
      ...ds,
      ...new Array(d4).fill(1).map((_, el) => el + 1),
    ];

    return (
      <CalendarContainer visible={visible}>
        <Toolbar>
          <ButtonPrev type="button" className="prev-month" onClick={this.prevMonth}>
            {returnState ? returnValueShow.minus({ month: 1 }).monthShort : valueShow.minus({ month: 1 }).monthShort}
          </ButtonPrev>
          <CurrentDate>
            {returnState
              ? returnValueShow.toLocaleString({ month: 'long', year: 'numeric' })
              : valueShow.toLocaleString({ month: 'long', year: 'numeric' })
            }
          </CurrentDate>
          <CurrentDate>
            {returnState
              ? returnValueShow.plus({ month: 1 }).toLocaleString({ month: 'long', year: 'numeric' })
              : valueShow.plus({ month: 1 }).toLocaleString({ month: 'long', year: 'numeric' })
            }
          </CurrentDate>
          <ButtonNext type="button" className="next-month" onClick={this.nextMonth}>
            {returnState ? returnValueShow.plus({ month: 2 }).monthShort : valueShow.plus({ month: 2 }).monthShort}
          </ButtonNext>
        </Toolbar>
        <TableContainer>
          <TableBContainer>
            <Table>
              <thead>
                <tr>
                  {getWeeks(dateFrom.setLocale(language)).map((w, i) => <Td key={`${i + w}`}>{w}</Td>)}
                </tr>
              </thead>

              <tbody>
                {chunk(days, 7).map((row, w) => (
                  <tr key={`week-${w + w}`}>
                    {row.map(i => (
                      <Day
                        key={`day-${Math.random()}`}
                        i={i}
                        w={w}
                        value={value}
                        selectDate={this.selectDate}
                        returnValue={returnValue}
                        returnState={returnState}
                        valueShow={valueShow}
                        returnValueShow={returnValueShow}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <MainButton
              type="button"
              className="ion-checkmark"
              onClick={handleConfirmClick}
            >
              OK
            </MainButton>
          </TableBContainer>
          <TableBContainer>
            <Table>
              <thead>
                <tr>
                  {getWeeks(dateTo.setLocale(language)).map((w, i) => <Td key={`${i + w}`}>{w}</Td>)}
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
                        valueShow={valueShow}
                        returnValueShow={returnValueShow}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <MainButton
              type="button"
              className="ion-checkmark"
              onClick={handleCancelClick}
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
