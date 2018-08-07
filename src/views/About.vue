<template>
  <div class="app-calculate">
    <appHeader :step="step" />

    <div class="app-calculate__content">
      <transition name="slidefade">
        <div class="step step-1" v-if="step === '1'">
          <label class="form-label" for="name">
            Hallo, wie heißt du?
          </label>

          <input type="text"
                 placeholder="Maxi"
                 class="form-input"
                 :model="user.name"
                 :value="user.name"
                 @change="safeUserName($event.target.value)"
                 id="name"
                 name="name">
        </div>

        <div class="step step-2" v-else>
          <h2 class="form-label">
            Für deinen vorraussichtlichen Geburtstermin benötigen wir folgende Angaben:
          </h2>

          <div class="btn-group">
            <label class="btn btn-group__item" for="startDate">
              <span>Tag der letzten Periode</span>
            </label>
            <label class="btn btn--disabled btn-group__item" for="endDate">
              <span>errechnetes Geburtstermin</span>
            </label>
          </div>

          <input class="form-input"
                 id="startDate"
                 type="date"
                 :model="startDate"
                 :value="startDate"
                 @change="calculateBirthdate($event.target.value)">

          <select class="form-input"
                  v-model="cycleLength">
            <option value="-4">23</option>
            <option value="-3">24</option>
            <option value="-2">25</option>
            <option value="-1">27</option>
            <option value="0" selected>28</option>
            <option value="1">29</option>
            <option value="2">30</option>
            <option value="3">31</option>
            <option value="4">32</option>
          </select>
        </div>

      </transition>

      <p v-if="currentWeek">{{ currentWeek.weeks }}
        <span v-if="currentWeek.days">+{{ currentWeek.days }}</span>
      </p>

      <input class="form-input"
             id="endDate"
             type="date"
             :model="endDate"
             :value="endDate"
             @change="calculateLastDayOfPeriod($event.target.value)">

      <p>{{ startDate }} - {{ endDate }}</p>
    </div>

    <div class="app-calculate__submit">
      <button class="btn">Weiter</button>
    </div>

  </div>
</template>

<script>
import { DateTime } from 'luxon';
import AppHeader from '@/components/AppHeader.vue';

DateTime.local();

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      current: String,
      user: this.$store.state.user,
      currentWeek: {},
      startDate: String,
      cycleLength: 0,
      endDate: this.$store.state.calculatedBirthDate,
      today: DateTime.local(),
      step: !this.$store.state.user.name ? '1' : '2',
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
    safeUserName(name) {
      this.user.name = name;
      this.$store.commit('updateName', { user: this.user });
    },
    calculateBirthdate(date) {
      const startDate = DateTime.fromISO(date);
      const calculatedDate = startDate
        .plus({ day: 7 })
        .minus({ month: 3 })
        // .plus({ day: this.cycleLength })
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
        // .minus({ day: this.cycleLength })
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
<style scoped lang="scss">
  .app-calculate {
    height: 100vh;
    display: grid;
    grid: [row1-start] "header header header" 110px [row1-end]
    [row2-start] ". content ." 1fr [row2-end]
    [row3-start] ". submit ." 90px [row3-end]
          / minmax(2%, auto) minmax(auto, 650px) minmax(2%, auto);

    &__content {
      grid-area: content;
    }

    &__submit {
      grid-area: submit;
    }
  }

  /**
  Form Styles
   */
  .form-label {
    font-size: 18px;
    line-height: 30px;
  }

  .form-input {
    font-weight: 100;
    display: block;
    text-align: center;
    width: 100%;
    position: relative;
    font-size: 18px;
    line-height: 24px;
    outline: 0;
    background: transparent;
    border: none;
    padding: 11px;

    border-bottom: solid 2px var(--color-primary);
    /**
     * Remove default box-shadow for required pseudo classes
   */
    &:required {
       box-shadow: none;
     }
  }

  .btn {
    --button-radius: 25px;

    display: block;
    width: 100%;
    background: var(--color-primary);
    padding: 14px;
    text-align: center;
    min-height: 50px;
    border-radius: var(--button-radius);
    font-size: 18px;
    color: #fff;

    &:disabled,
    &--disabled {
      background: #E6E6E6;
      color: var(--color-primary);
    }
  }

  .btn-group {
    display: flex;
    align-items: stretch;
    align-content: center;

    span {
      height: 100%;
      display: flex;
      justify-content: center; /* align horizontal */
      align-items: center;
    }

    &__item {
      flex: 1 1 auto;
      border-radius: 0;
      border-top-left-radius: var(--button-radius);
      border-bottom-left-radius: var(--button-radius);

      & + & {
        border-radius: 0;
        border-top-right-radius: var(--button-radius);
        border-bottom-right-radius: var(--button-radius);
      }
    }
  }

  // the actual vue transition.
  //
  // enter-active, leave-active --> the transitions are currently active, make sure to
  // transition.
  //
  .slidefade-enter-active, .slidefade-leave-active {
    transition: all ease .4s;
  }

  //
  // enter    --> enter-to  (start behind curtain, then onto stage)
  // leave-to --> leave     (start on stage, move behind curtain  )
  //
  .slidefade-enter, .slidefade-leave-to {
    transform: translate(30px);
    opacity: 0;
  }
</style>
