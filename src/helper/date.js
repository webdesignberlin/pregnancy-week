import { DateTime } from 'luxon';

/**
 * Get Now
 * @returns {DateTime} - ISO 8601
 */
function getToday() {
  return DateTime.local();
}

/**
 * Get Weeks and Days via End-date from Now
 * @param {string} date - YYYY-MM-DD
 * @returns {Duration}
 */
function calculateCurrentWeek(date) {
  const end = DateTime.fromISO(DateTime.local().toISODate());
  const start = DateTime.fromISO(date);

  return end.diff(start, ['weeks', 'days']);
}

/**
 * Get calculated Date of Birth
 * @param {string} lastDayOfPeriod - YYYY-MM-DD
 * @returns {string} - DateTime ISO 8601
 */
function calculateDateOfBirth(lastDayOfPeriod) {
  const startDate = DateTime.fromISO(lastDayOfPeriod);
  return startDate
    .plus({ day: 7 })
    .minus({ month: 3 })
    // .plus({ day: this.cycleLength })
    .plus({ year: 1 })
    .toISODate();
}

/**
 * Calculate last day of Period
 * @param {string} dateOfBirth - YYYY-MM-DD
 * @returns {string} - DateTime ISO 8601
 */
function calculateLastDayOfPeriod(dateOfBirth) {
  const endDate = DateTime.fromISO(dateOfBirth);
  return endDate
    .minus({ day: 6 })
    .plus({ month: 3 })
    // .minus({ day: this.cycleLength })
    .minus({ year: 1 })
    .toISODate();
}

/**
 * Calculate Days to given End Date
 * @param date
 * @returns {number}
 */
function getDaysTo(date) {
  const dateDiff = DateTime.fromISO(date).diff(DateTime.local(), 'days').toObject();
  return Math.floor(dateDiff.days);
}

/**
 * Is it time for night mode?
 * @returns {boolean}
 */
function isNightMode() {
  // Interval.fromDateTimes(dt2, dt3).contains(DateTime.local());
  const now = DateTime.local().toLocaleString(DateTime.TIME_24_SIMPLE);
  const night = '18:25';
  return now > night;
}

export default {
  getToday,
  calculateCurrentWeek,
  calculateDateOfBirth,
  calculateLastDayOfPeriod,
  isNightMode,
  getDaysTo,
};
