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

export default {
  getToday,
  calculateCurrentWeek,
  calculateDateOfBirth,
  calculateLastDayOfPeriod,
};
