// @flow
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import styled, { type StyledComponent } from 'styled-components';
import chunk from 'lodash.chunk';
import { DateTime } from 'luxon';
/** eslint-enable */
import Day from './Day';

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
  color: rgb(25, 31, 38);
  background: transparent;
  border: 1px solid rgb(0, 161, 95);
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    color: rgb(248, 248, 248);
    background-color: rgb(0, 161, 95);
  }

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

  selectDate = (date: DateTime) => {
    const { dateFrom, dateTo, onChange } = this.props;

    const { first } = this.state;

    if (first) {
      onChange(date, +dateTo < +date ? date.plus({ days: 1 }) : dateTo);
    } else {
      onChange(dateFrom, date);
    }
    this.setState(state => ({ first: !state.first }));
  }

  prevMonth = () => {
    const { month } = this.state;
    const nextMonth = month.minus({ month: 1 });
    if (nextMonth.month < DateTime.local().month) {
      return;
    }

    this.setState(() => ({ month: nextMonth }));
  }

  nextMonth = () => {
    this.setState(({ month }) => ({ month: month.plus({ month: 1 }) }));
  }

  render() {
    const {
      dateFrom, visible, language, dateTo,
    } = this.props;

    const { hoveredDay, month } = this.state;

    const d3 = month.endOf('month').day;
    const d4 = month.plus({ month: 1 }).endOf('month').day;

    const d5 = month.set({ day: 1 }).weekday;
    const d6 = month.plus({ month: 1 }).set({ day: 1 }).weekday;
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
            {month.minus({ month: 1 }).toLocaleString({ month: 'short' })}
          </ButtonPrev>
          <CurrentDate>
            {month.toLocaleString({ month: 'long', year: 'numeric' })}
          </CurrentDate>
          <CurrentDate>
            {month.plus({ month: 1 }).toLocaleString({ month: 'long', year: 'numeric' })}
          </CurrentDate>
          <ButtonNext type="button" className="next-month" onClick={this.nextMonth}>
            {month.plus({ month: 1 }).toLocaleString({ month: 'short' })}
          </ButtonNext>
        </Toolbar>
        <TableContainer>
          <TableBContainer>
            <Table>
              <thead>
                <tr>
                  {getWeeks(month.setLocale(language)).map((w, i) => <Td key={`${i + w}`}>{w}</Td>)}
                </tr>
              </thead>

              <tbody>
                {chunk(days, 7).map((row, w) => (
                  <tr key={`week-${w + w}`}>
                    {row.map(i => (
                      <Day
                        key={`day-${Math.random()}`}
                        date={month.set({ day: i })}
                        i={i}
                        selectDate={this.selectDate}
                        dateTo={dateTo}
                        dateFrom={dateFrom}
                        hovered={hoveredDay}
                        onHover={this.setHovered}
                        disabled={+month.set({ day: i }) < +DateTime.local()}
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
                  {getWeeks(month.setLocale(language)).map((w, i) => <Td key={`${i + w}`}>{w}</Td>)}
                </tr>
              </thead>

              <tbody>
                {chunk(days1, 7).map((row, w) => (
                  <tr key={`week-${w + w}`}>
                    {row.map(i => (
                      <Day
                        key={`day1-${Math.random()}`}
                        date={month.plus({ month: 1 }).set({ day: i })}
                        i={i}
                        selectDate={this.selectDate}
                        dateTo={dateTo}
                        dateFrom={dateFrom}
                        hovered={hoveredDay}
                        onHover={this.setHovered}
                        disabled={false}
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
