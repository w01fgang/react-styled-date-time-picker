// @flow
import React, { PureComponent } from 'react';
import cx from 'classnames';

type Props = {
  i: number,
  w: number,
  d: number,
};

class Day extends PureComponent<Props> {
  render() {
    const { i, w } = this.props;
    const prevMonth = (w === 0 && i > 7);
    const nextMonth = (w >= 4 && i <= 14);
    const cn = cx({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current-day': !prevMonth && !nextMonth && (i === this.props.d),
    });

    return <td className={cn} {... this.props}>{i}</td>;
  }
}

export default Day;
