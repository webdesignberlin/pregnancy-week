<template>
  <div class="about">
    <h1>This is an about page</h1>

    <input type="date"
      :model="startDate"
      :value="startDate"
      @change="calculateBirthdate($event.target.value)">

    <p>{{ currentWeek.weeks }}
      <span v-if="currentWeek.days">+{{ currentWeek.days }}</span>
    </p>

    <input type="date"
      :model="endDate"
      :value="endDate"
      @change="calculateLastDayOfPeriod($event.target.value)">

    <p>{{ startDate }} - {{ endDate }}</p>

  </div>
</template>

<script>
import { DateTime } from 'luxon';

DateTime.local();

export default {
  data() {
    return {
      current: String,
      currentWeek: {},
      startDate: String,
      endDate: this.$store.state.calculatedBirthDate,
      today: DateTime.local(),
    };
  },
  mounted() {
    this.$store.commit('initialiseStore');
    if (this.$store.state.calculatedBirthDate) {
      console.log('bin da');
      this.calculateLastDayOfPeriod(this.endDate);
    }
  },
  methods: {
    calculateBirthdate(date) {
      const startDate = DateTime.fromISO(date);
      const calculatedDate = startDate
        .plus({ day: 7 })
        .minus({ month: 3 })
        .plus({ year: 1 })
        .toISODate();
      // this.$store.commit('updateCalculatedBirthdate', calculatedDate);
      this.startDate = date;
      this.endDate = calculatedDate;
      this.calculateCurrentWeek(date);
    },
    calculateLastDayOfPeriod(date) {
      const endDate = DateTime.fromISO(date);
      const calculatedDate = endDate
        .minus({ day: 6 })
        .plus({ month: 3 })
        .minus({ year: 1 })
        .toISODate();
      this.endDate = date;
      this.startDate = calculatedDate;
      this.calculateCurrentWeek(calculatedDate);
    },
    calculateCurrentWeek(date) {
      const end = DateTime.fromISO(this.today.toISODate());
      const start = DateTime.fromISO(date);

      this.$store.commit('update', this.endDate);
      // localStorage.setItem('store', JSON.stringify(this.endDate));

      this.currentWeek = end.diff(start, ['weeks', 'days']); //= > { months: 1, days: 2 }
    },
  },
};
</script>
