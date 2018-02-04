// @flow
import React, { PureComponent } from 'react';
import type Moment from 'moment';

type Props = {
  onChange: Function,
  switchTab: Function,
  moment: Moment,
};

class Calendar extends PureComponent<Props> {
  selectDate = (i, w) => {
    var prevMonth = (w === 0 && i > 7);
    var nextMonth = (w >= 4 && i <= 14);
    var m = this.props.moment;

    m.date(i);
    if(prevMonth) m.subtract(1, 'month');
    if(nextMonth) m.add(1, 'month');
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
    const { moment: m } = this.props;
    const d = m.date();
    const d1 = m.clone().subtract(1, 'month').endOf('month').date();
    const d2 = m.clone().date(1).day();
    const d3 = m.clone().endOf('month').date();

    const days = [
      ...range(d1-d2+1, d1+1),
      ...range(1, d3+1),
      ...range(1, 42-d3-d2+1)
    ];

    var weeks = labels[this.props.language  ];

    return (
      <div className={cx('m-calendar', this.props.className)}>
        <div className="toolbar">
          <button type="button" className="prev-month" onClick={this.prevMonth}>
            <i className="ion-ios-arrow-left"/>
          </button>
          <span className="current-date">{m.format('MMMM YYYY')}</span>
          <button type="button" className="next-month" onClick={this.nextMonth}>
            <i className="ion-ios-arrow-right"/>
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {weeks.map((w, i) => <td key={i}>{w}</td>)}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) => (
              <tr key={w}>
                {row.map((i) => (
                  <Day key={i} i={i} d={d} w={w}
                    onClick={this.selectDate.bind(null, i, w)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
