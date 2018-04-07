// @flow
/* eslint-disable import/no-unresolved, import/extensions */

export default (i: number, w: number, value: DateTime) => {
  const prevMonth = (w === 0 && i > 7);
  const nextMonth = (w >= 4 && i <= 14);
  let date = value;
  if (prevMonth) date = date.minus({ month: 1 });
  if (nextMonth) date = date.plus({ month: 1 });
  date = date.set({ day: i });
  return date;
};
