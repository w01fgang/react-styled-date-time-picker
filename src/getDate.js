export default (i, w, value) => {
  const nextMonth = (w > 5);
  let date = value;
  if (nextMonth) date = date.plus({ month: 1 });
  date = date.set({ day: i });
  return date;
};
