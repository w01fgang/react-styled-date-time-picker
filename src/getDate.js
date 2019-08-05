// @flow
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import { type DateTime } from 'luxon';
/** eslint-enable */
export default (i: number, w: number, value: DateTime): DateTime => {
  const nextMonth = (w > 5);
  let date = value;
  if (nextMonth) date = date.plus({ month: 1 });
  date = date.set({ day: i });
  return date;
};
