<template>
  <div>
    <b-progress
      size="is-small"
      :type="progressBarType"
      :value="timeElapsedPercent"
    >
      {{ Math.floor(this.timeElapsed) }} / {{ this.roundTime }}
    </b-progress>
    <score-board :teams="teams" :currentRound="currentRound"></score-board>
    <div class="section fix-height has-text-centered">
      <transition
        enter-active-class="bounceLeft-enter"
        leave-active-class="bounceRight-leave"
      >
        <word-box
          :guessWord="word.guessWord"
          :tabooWords="word.tabooWords"
        ></word-box>
      </transition>
    </div>
    <div class="section columns is-mobile is-1">
      <div class="column is-one-third">
        <b-button
          class="has-text-weight-semibold"
          type="is-danger"
          size="is-large"
          expanded
          @click="taboo"
        >
          TABOO
        </b-button>
      </div>
      <div class="column is-one-third">
        <b-button
          class="has-text-weight-semibold"
          type="is-info"
          size="is-large"
          expanded
          @click="pass"
        >
          PASS
        </b-button>
      </div>
      <div class="column is-one-third">
        <b-button
          class="has-text-weight-semibold"
          type="is-success "
          size="is-large"
          expanded
          @click="correct"
        >
          CORRECT
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import WordBox from "@/components/WordBox";
import ScoreBoard from "@/components/ScoreBoard";
import { getWord } from "@/services/taboo";
export default {
  props: {
    teams: {
      type: Array,
      required: true
    },
    currentRound: {
      type: Number,
      required: true
    },
    roundTime: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      timerInstance: null,
      clockTickMs: 200,
      timeElapsed: 0,
      roundScore: 0,
      word: getWord()
    };
  },
  computed: {
    timeElapsedPercent() {
      return Math.floor((this.timeElapsed / this.roundTime) * 100);
    },
    progressBarType() {
      if (this.timeElapsedPercent < 50) {
        return "is-success";
      } else if (this.timeElapsedPercent < 75) {
        return "is-warning";
      } else {
        return "is-danger";
      }
    }
  },
  components: {
    WordBox,
    ScoreBoard
  },
  mounted() {
    this.roundScore = 0;
    this.timeElapsed = 0;
    this.timerInstance = setInterval(this.tick, this.clockTickMs);
    console.log(this.teams);
  },
  beforeDestroy() {
    console.log("I'm going to be desttoyed");
  },
  methods: {
    tick() {
      this.timeElapsed += this.clockTickMs / 1000;
      if (this.timeElapsed >= this.roundTime) {
        clearInterval(this.timerInstance);
        this.$emit("round-over", this.roundScore);
      }
    },
    taboo() {
      this.roundScore -= 1;
      this.word = getWord();
    },
    pass() {
      this.roundScore -= 1;
      this.word = getWord();
    },
    correct() {
      this.roundScore += 1;
      this.word = getWord();
    }
  }
};
</script>

<style lang="scss" scoped>
.column {
  padding: 2px;
}
.score {
  font-size: 4rem;
}
.winning-team {
  border: 2px solid black;
}
.skew-c {
  width: 100%;
  height: 50px;
  position: absolute;
  left: 0px;
  margin-bottom: 600px;
  background: linear-gradient(135deg, #fff 50%, #8c67ef 50%);
}

.fix-height {
  height: 550px;
}
</style>
