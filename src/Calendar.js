// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import range from 'lodash.range';
import chunk from 'lodash.chunk';
import type Moment from 'moment';

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
  color: #CC2262;
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
  color: #CC2262;
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
  color: #CC2262;
  border: 1px solid #dfe0e4;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
`;

type Props = {
  onChange: Function,
  switchTab: Function,
  moment: Moment,
  language: Language,
  visible: boolean,
};

class Calendar extends PureComponent<Props> {
  selectDate = (i: number, w: number) => {
    const prevMonth = (w === 0 && i > 7);
    const nextMonth = (w >= 4 && i <= 14);
    const m = this.props.moment;

    m.date(i);
    if (prevMonth) m.subtract(1, 'month');
    if (nextMonth) m.add(1, 'month');
    this.props.onChange(m);
    this.props.switchTab();
  }

  prevMonth = (e: Event) => {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'month'));
  }

  nextMonth = (e: Event) => {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'month'));
  }

  render() {
    const { moment: m, visible } = this.props;
    const d = m.date();
    const d1 = m.clone().subtract(1, 'month').endOf('month').date();
    const d2 = m.clone().date(1).day();
    const d3 = m.clone().endOf('month').date();

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
          <CurrentDate>{m.format('MMMM YYYY')}</CurrentDate>
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
