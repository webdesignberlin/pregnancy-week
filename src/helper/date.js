import { DateTime } from 'luxon';

function getToday() {
  return DateTime.local();
}

function calculateCurrentWeek(date) {
  const end = DateTime.fromISO(DateTime.local().toISODate());
  const start = DateTime.fromISO(date);

  return end.diff(start, ['weeks', 'days']);
}

function calculateDateOfBirth(lastDayOfPeriod) {
  const startDate = DateTime.fromISO(lastDayOfPeriod);
  return startDate
    .plus({ day: 7 })
    .minus({ month: 3 })
    // .plus({ day: this.cycleLength })
    .plus({ year: 1 })
    .toISODate();
}

function calculateLastDayOfPeriod(dateOfBirth) {
  const endDate = DateTime.fromISO(dateOfBirth);
  return endDate
    .minus({ day: 6 })
    .plus({ month: 3 })
    // .minus({ day: this.cycleLength })
    .minus({ year: 1 })
    .toISODate();
}

export default {
  getToday,
  calculateCurrentWeek,
  calculateDateOfBirth,
  calculateLastDayOfPeriod,
};
