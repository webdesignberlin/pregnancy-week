<template>
    <div class="app-result">
        <appHeader />

        <div class="header-wrapper">
            <div class="animated-header"
                 v-bind:class="{ 'animated-header--night' : nightIsActive }"
                 @click="getNight()">
                <div class="animated-header__sky"></div>
                <div class="animated-header__sun"></div>
                <div class="animated-header__moon"></div>
            </div>

            <div class="result">
                <div class="result__count">
                    <span class="result__weeks">{{ currentWeek.weeks }}</span>
                    <span class="result__days" v-if="currentWeek.days">
                        +{{ currentWeek.days }}
                    </span>
                </div>
                <abbr class="result__title" title="Schwangerschaftswoche">SSW</abbr>
            </div>
        </div>

        <div class="app-result__content">
            <h1>{{ user.name }}</h1>
            <p>bald ist es soweit! Noch {{ daysLeft }} Tage bis zum errechneten Geburtstermin.</p>
        </div>

    </div>
</template>

<script>
import Dates from '@/helper/date';
import AppHeader from '@/components/AppHeader.vue';
import UiBtn from '@/components/ui/button.vue';

export default {
  components: {
    UiBtn,
    AppHeader,
  },
  data() {
    return {
      user: this.$store.state.user,
      currentWeek: {},
      endDate: this.$store.state.calculatedBirthDate,
      nightIsActive: Dates.isNightMode(),
      daysLeft: Dates.getDaysTo(this.$store.state.calculatedBirthDate),
    };
  },
  mounted() {
    this.$store.commit('initialiseStore');
    if (this.$store.state.calculatedBirthDate) {
      const date = this.$store.state.calculatedBirthDate;
      this.calculateCurrentWeek(Dates.calculateLastDayOfPeriod(date));
    }
  },
  methods: {
    calculateCurrentWeek(startDate) {
      this.currentWeek = Dates.calculateCurrentWeek(startDate); //= > { months: 1, days: 2 }
    },
    getNight() {
      this.nightIsActive = true;
    },
  },
};
</script>
<style scoped lang="scss">
    .app-result {
        --animated-header-height: 20vh;
    }

    .header-wrapper {
        grid-area: intro;
        max-height: var(--animated-header-height);
        position: relative;
    }
    /* Icon design greatly inspired by an svg created by Garrett Knoll: https://thenounproject.com/g_a.k_/uploads/?i=218424 */
    .animated-header {
        --light: #CBE2FF;
        --accent: #B9C1D0;
        --dark: #B9C1D0;
        --elem: #fff;
        --moon: #fff;
        --sun: yellow;
        --sun__glow: #ffeda2;
        --transformOrigin: -400% 4000%;
        --moonOffsetX: 20px;
        --moonOffsetY: 6px;

        clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);

        position: fixed;
        width: 100vw;
        height: var(--animated-header-height);
        transform: translate3d(0, 0, 0);
        overflow: hidden;
        padding: 0;
        background-clip: padding-box;
        // grid-column: 1 / 3;
        // grid-row: 2;

        &__sky {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            transform: translateY(0%) translateZ(0);
            transition: 2s;
            background-color: var(--light);
            background: linear-gradient(var(--light), var(--accent), var(--dark));
            background-size: 100% 500%;
            background-position: top left;
        }

        &__sun {
            position: absolute;
            left: 66%;
            top: 25%;
            width: 5em;
            height: 5em;
            border-radius: 100%;
            background-color: var(--sun);
            transform-origin: var(--transformOrigin);
            animation: loopIn 0.6s both ease-out, sun-glow 10s infinite;
            animation: sun-glow 10s infinite;

            box-shadow: 0 0 10px var(--sun__glow),
            0 0 20px var(--sun__glow),
            0 0 30px var(--sun__glow),
            0 0 40px var(--sun__glow),
            0 0 60px var(--sun__glow);
        }

        &__moon {
            position: absolute;
            left: 66%;
            top: 25%;
            width: 3em;
            height: 3em;
            border-radius: 100%;
            margin-left: calc(var(--moonOffsetX) * -1);
            margin-top: calc(var(--moonOffsetY) * -1);
            transform-origin: var(--transformOrigin);
            animation: loopOut 0.65s both linear;
            opacity: 0;
        }

        &__moon:after {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 100%;
            box-shadow: var(--moonOffsetX) var(--moonOffsetY) 0 0 #fff;
            animation: loopOutMoon 0.65s both linear;
        }

        &--night {
            .animated-header__sun {
                animation: loopOut 0.65s both linear;
            }
            .animated-header__sky {
                background-position: left 85%;
            }
            .animated-header__moon {
                animation: loopIn 0.6s both ease-out;
                opacity: 1;
            }
            .animated-header__moon:after {
                animation: loopInMoon 0.6s both ease-out;
            }
        }
    }

    @keyframes getIn {
        0% {
            transform: translateY(-100%);
        }
        90% {
            transform: translateY(var(--animated-header-height));
            border-width: inherit;
        }
        100% {
            transform: translateY(100%);
            border-width: 1em;
        }
    }

    @keyframes loopIn {
        0% {
            transform: rotate(50deg) translateZ(0);
        }
        100% {
            transform: rotate(0) translateZ(0);
        }
    }

    @keyframes loopOut {
        0% {
            transform: rotate(0deg) translateZ(0);
        }
        100% {
            transform: rotate(-80deg) translateZ(0);
        }
    }

    @keyframes loopOutMoon {
        0% {
            transform: rotate(0deg) translateZ(0);
        }
        100% {
            transform: rotate(80deg) translateZ(0);
        }
    }

    @keyframes loopInMoon {
        0% {
            transform: rotate(0deg) translateZ(0);
        }
        100% {
            transform: rotate(0deg) translateZ(0);
        }
    }

    @keyframes sun-glow {
        0% {
            box-shadow: 0 0 10px var(--sun__glow),
            0 0 20px var(--sun__glow),
            0 0 35px var(--sun__glow),
            0 0 40px var(--sun__glow),
            0 0 70px var(--sun__glow),
            0 0 180px var(--sun__glow),
            0 0 120px var(--sun__glow);
        }
        50% {
            box-shadow: 0 0 10px var(--sun__glow),
            0 0 20px var(--sun__glow),
            0 0 30px var(--sun__glow),
            0 0 50px var(--sun__glow),
            0 0 70px var(--sun__glow),
            0 0 180px var(--sun__glow),
            0 0 120px var(--sun__glow);
        }
        100% {
            box-shadow: 0 0 10px var(--sun__glow),
            0 0 25px var(--sun__glow),
            0 0 35px var(--sun__glow),
            0 0 40px var(--sun__glow),
            0 0 70px var(--sun__glow),
            0 0 180px var(--sun__glow),
            0 0 130px var(--sun__glow);
        }
    }

    .result {
        --result-size: 248px;

        display: grid;
        align-content: center;
        justify-content: center;
        width: var(--result-size);
        height: var(--result-size);
        margin: 0 auto;
        border: 1px solid var(--color-primary);
        border-radius: 50%;
        background-color: #fff;
        opacity: 1;
        transform: translate3d(0, 0, 0);
        animation: getIn 1s both ease-out;
        transform-origin: -200% 0;

        grid: [rowCount-start] "count" 1fr [rowCount-end]
        [rowTitle-start] "title" 1fr [rowTitle-end]
          / minmax(auto, 80%);

        &__title {
            grid-area: title;

            padding-top: 0.25em;
            font-size: 35px;
        }

        &__count {
            grid-area: count;
            align-self: end;
            text-align: center;
        }

        &__weeks {
            display: inline-block;
            font-size: 70px;
            height: 1em;
            vertical-align: text-bottom;
        }

        &__days {
            display: inline-block;
            font-size: 35px;
            height: 1em;
            vertical-align: text-bottom;

        }
    }

    .app-result {
        height: 100vh;
        display: grid;
        grid: [row1-start] "header header header" 110px [row1-end]
        [row2-start] "intro intro intro" var(--animated-header-height) [row2-end]
        [row3-start] ". content ." 1fr [row3-end]
          / minmax(20px, auto) minmax(auto, 650px) minmax(20px, auto);

        &__content {
            grid-area: content;
            justify-self: center;
            align-self: center;
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
