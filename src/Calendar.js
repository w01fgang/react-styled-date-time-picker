// @flow
/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import range from 'lodash.range';
import chunk from 'lodash.chunk';
import { type DateTime } from 'luxon';
/** eslint-enable */
import Day from './Day';

const labels = {
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  es: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  pt: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  it: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
};

const CalendarContainer = styled.div`
  display: ${props => (props.visible ? 'display: inline-block;' : 'none')};
`;

const Toolbar = styled.div`
  line-height: 30px;
  color: #00A15F;
  text-align: center;
  margin-bottom: 13px;
`;

const ButtonNext = styled.button`
  color: #999999;
  float: right;
  
  &:focus {
    outline: none;
  }
`;
const ButtonPrev = styled.button`
  color: #999999;
  float: left;
  
  &:focus {
    outline: none;
  }
`;

const CurrentDate = styled.span`
  color: #00A15F;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
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
`;

type Props = {
  onChange: Function,
  switchTab: Function,
  value: DateTime,
  language: Language,
  visible: boolean,
};

class Calendar extends PureComponent<Props> {
  selectDate = (i: number, w: number) => {
    const prevMonth = (w === 0 && i > 7);
    const nextMonth = (w >= 4 && i <= 14);
    const { value } = this.props;
    let date = value.set({ day: i });
    if (prevMonth) date = date.minus({ month: 1 });
    if (nextMonth) date = date.plus({ month: 1 });
    console.log(date);
    
    this.props.onChange(date);
    this.props.switchTab();
  }

  prevMonth = (e: Event) => {
    e.preventDefault();
    this.props.onChange(this.props.value.minus({ month: 1 }));
  }

  nextMonth = (e: Event) => {
    e.preventDefault();
    this.props.onChange(this.props.value.plus({ month: 1 }));
  }

  render() {
    const { value, visible } = this.props;
    const d = value.day;
    const d1 = value.minus({ month: 1 }).endOf('month').day;
    const d2 = value.set({ day: 1 }).day;
    const d3 = value.endOf('month').day;

    const days = [
      ...range(d1 - (d2 + 1), d1 + 1),
      ...range(1, d3 + 1),
      ...range(1, (42 - d3 - d2) + 1),
    ];

    const weeks = labels[this.props.language];

    return (
      <CalendarContainer visible={visible}>
        <Toolbar>
          <ButtonPrev type="button" className="prev-month" onClick={this.prevMonth}>
            <i className="ion-ios-arrow-left" />
          </ButtonPrev>
          <CurrentDate>{value.toLocaleString({ year: 'numeric', month: 'numeric' })}</CurrentDate>
          <ButtonNext type="button" className="next-month" onClick={this.nextMonth}>
            <i className="ion-ios-arrow-right" />
          </ButtonNext>
        </Toolbar>

        <Table>
          <thead>
            <tr>
              {weeks.map((w, i) => <Td key={`${i + w}`}>{w}</Td>)}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) => (
              <tr key={`week-${w + w}`}>
                {row.map(i => (
                  <Day
                    key={`day-${i + i}`}
                    i={i}
                    d={d}
                    w={w}
                    selectDate={this.selectDate}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </CalendarContainer>
    );
  }
}

export default Calendar;
