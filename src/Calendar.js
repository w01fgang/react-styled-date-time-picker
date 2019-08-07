// @flow
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
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

const Button: StyledComponent<{}, {}, HTMLButtonElement> = styled.button`
  color: #999999;

  &:focus {
    outline: none;
  }
`;

const ButtonNext: StyledComponent<{}, {}, React$ComponentType<*>> = styled(Button)``;

const ButtonPrev: StyledComponent<{}, {}, React$ComponentType<*>> = styled(Button)``;

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

type Props = {
  +dateFrom: DateTime,
  +dateTo: DateTime,
  +onChange: (dateFrom: DateTime, dateTo: DateTime) => void,
  +language: Language,
  +visible: boolean,
};

type State = {
  first: boolean,
  month: DateTime,
  hoveredDay: ?DateTime,
};

class Calendar extends PureComponent<Props, State> {
  static defaultProps = {
    returnState: false,
    returnValueShow: DateTime.local(),
    onSelect: console.log,
    onChangeShow: console.log,
    onChangeMonth: console.log,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      first: true,
      month: props.dateFrom,
      hoveredDay: null,
    };
  }

  setHovered = (hoveredDay: DateTime) => {
    this.setState(() => ({ hoveredDay }));
  }

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

  prevMonth = () => {
    const { month } = this.state;
    const { dateFrom, onChangeMonth } = this.props;

    const date = dateFrom.set({ day: 1 });
    onChangeMonth(date.minus({ month: 2 }));
  }

  nextMonth = () => {
    const { month } = this.state;
    const { dateFrom, onChangeMonth } = this.props;
    const date = dateFrom.set({ day: 1 });
    onChangeMonth(date.plus({ month: 2 }));
  }

  render() {
    const {
      dateFrom, visible, language, dateTo, returnValueShow,
    } = this.props;

    const { hoveredDay } = this.state;

    let d3;
    let d4;
    d3 = dateFrom.endOf('month').day;
    d4 = dateFrom.plus({ month: 1 }).endOf('month').day;

    const d5 = dateFrom.set({ day: 1 }).weekday;
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
            {dateFrom.minus({ month: 1 }).toLocaleString({ month: 'short' })}
          </ButtonPrev>
          <CurrentDate>
            {dateFrom.toLocaleString({ month: 'long', year: 'numeric' })}
          </CurrentDate>
          <CurrentDate>
            {dateFrom.plus({ month: 1 }).toLocaleString({ month: 'long', year: 'numeric' })}
          </CurrentDate>
          <ButtonNext type="button" className="next-month" onClick={this.nextMonth}>
            {dateFrom.plus({ month: 1 }).toLocaleString({ month: 'short' })}
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
                        m={dateFrom.month}
                        selectDate={this.selectDate}
                        dateTo={dateTo}
                        dateFrom={dateFrom}
                        hovered={hoveredDay}
                        onHover={this.setHovered}
                        disabled={dateFrom.day < DateTime.local().day}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
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
                        m={dateTo.month}
                        selectDate={this.selectDate}
                        dateTo={dateTo}
                        dateFrom={dateFrom}
                        hovered={hoveredDay}
                        onHover={this.setHovered}
                        disabled={dateFrom.day < dateTo.day}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableBContainer>
        </TableContainer>
      </CalendarContainer>
    );
  }
}

export default Calendar;
