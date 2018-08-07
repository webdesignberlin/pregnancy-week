<template>
    <div class="app-calculate">
        <appHeader :step="step" :stepMax="stepMax" />

        <div class="app-calculate__content">
            <div class="step step-1" v-show="step === 1">
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

            <div class="step step-2" v-show="step === 2">
                <h2 class="form-label">
                    <span v-if="user.name">Hallo {{ user.name }}!</span>
                    Nun fehlt nur noch eines der beiden folgenden Daten
                    damit du deine Schwangerschaftswoche berechnen kannst.
                </h2>

                <div class="btn-group">
                    <label class="btn btn-group__item"
                           :class="{ 'btn--disabled' : selectedDateType === 'endDate' }"
                           for="startDate"
                           @click="switchDateType('startDate')">
                        <span>Tag der letzten Periode</span>
                    </label>
                    <label class="btn btn-group__item"
                           :class="{ 'btn--disabled' : selectedDateType === 'startDate' }"
                           for="endDate"
                           @click.prevent="switchDateType('endDate')">
                        <span>errechnetes Geburtstermin</span>
                    </label>
                </div>

                <div v-show="selectedDateType === 'startDate'">
                    <input class="form-input"
                           id="startDate"
                           type="date"
                           ref="startDate"
                           :model="startDate"
                           :value="startDate"
                           @change="calculateBirthdate($event.target.value)">

                    <label for="endDate" class="input-label">
                        Geburtstermin und Schwangerschaftswoche gehen von einer
                        Zykluslänge von 28 Tagen aus. Sollte das bei dir abweichen,
                        kannst du hier eine andere Länge auswählen.
                    </label>
                    <select class="form-input"
                            id="cycleLength"
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

                <div v-show="selectedDateType === 'endDate'">
                    <input class="form-input"
                           id="endDate"
                           type="date"
                           ref="endDate"
                           :model="endDate"
                           :value="endDate"
                           @change="calculateLastDayOfPeriod($event.target.value)">
                </div>
            </div>

            <div class="step step-3" v-show="step === 3">
                <h1>Herzlichen Glückwunsch!</h1>
                <p>Du befindest dich in der <strong>{{ currentWeek.weeks }}
                    <span v-if="currentWeek.days">+{{ currentWeek.days }}</span>
                    Schwangerschaftswoche </strong>.
                </p>

                <p>{{ startDate }} - {{ endDate }}</p>
            </div>
        </div>

        <div class="app-calculate__submit" v-if="step === stepMax">
            <button class="btn" @click.prevent="stepPrev()">zurück</button>
        </div>
        <div class="app-calculate__submit" v-else>
            <button class="btn" @click.prevent="stepNext()">Weiter</button>
        </div>

    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import Dates from '@/helper/date';

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      current: String,
      user: this.$store.state.user,
      currentWeek: {},
      startDate: null,
      cycleLength: 0,
      endDate: this.$store.state.calculatedBirthDate,
      today: Dates.getToday(),
      stepMax: 3,
      step: !this.$store.state.user.name ? 1 : 3,
      selectedDateType: 'startDate',
    };
  },
  mounted() {
    this.$store.commit('initialiseStore');
    if (this.$store.state.calculatedBirthDate) {
      this.calculateLastDayOfPeriod(this.endDate);
    }
  },
  methods: {
    switchDateType(string) {
      this.selectedDateType = string;
      this.$nextTick(() => {
        this.$refs[string].focus();
      });
    },
    safeUserName(name) {
      this.user.name = name;
      this.$store.commit('updateName', { user: this.user });
    },
    calculateBirthdate(date) {
      this.startDate = date;
      this.endDate = Dates.calculateDateOfBirth(date);
      this.calculateCurrentWeek(date);
    },
    calculateLastDayOfPeriod(date) {
      this.endDate = date;
      this.startDate = Dates.calculateLastDayOfPeriod(date);
      this.calculateCurrentWeek(Dates.calculateLastDayOfPeriod(date));
    },
    calculateCurrentWeek(date) {
      this.$store.commit('update', this.endDate);
      // localStorage.setItem('store', JSON.stringify(this.endDate));

      this.currentWeek = Dates.calculateCurrentWeek(date); //= > { months: 1, days: 2 }
    },
    stepPrev() {
      this.step -= 1;
    },
    stepNext() {
      if (this.step < this.stepMax) {
        this.step += 1;
      }
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
        margin-bottom: 40px;

        border-bottom: solid 2px var(--color-primary);
        appearance: none;
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
        margin-bottom: 40px;

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
