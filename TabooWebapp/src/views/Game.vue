<template name="game">
  <div class="container has-navbar-fixed-bottom" style="height: 100%">
    <div class="columns is-centered">
      <div class="column is-half">
        <transition enter-active-class="bounceInRight">
          <Round
            v-if="roundStartFlag"
            :currentRound="currentRound"
            :roundTime="time"
            :teams="teams"
            v-on:round-over="endRound"
          ></Round>
          <div v-else>
            <b-progress size="is-small" type="is-primary"></b-progress>
            <div class>
              <score-board
                :teams="teams"
                :currentRound="currentRound"
              ></score-board>
            </div>
            <div class="section fix-height">
              <score-table
                :teams="teams"
                :currentRound="currentRound"
                :totalRounds="rounds"
                :teamToPlayIdx="teamToPlayIdx"
              ></score-table>
            </div>
            <div class="section">
              <b-button
                v-if="!gameOverFlag"
                class="has-text-weight-semibold"
                type="is-primary"
                size="is-large"
                expanded
                @click="startRound"
                >START ROUND</b-button
              >
              <div v-else>
                <h1 v-if="winner" class="is-size-2 has-text-centered">
                  {{ winner }} WINS!
                </h1>
                <h1 v-else class="is-size-2 has-text-centered">IT'S A TIE</h1>
                <b-button
                  class="has-text-weight-semibold"
                  type="is-primary"
                  size="is-large"
                  @click="newGame"
                  expanded
                >
                  NEW GAME
                </b-button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Round from "@/components/Round.vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import ScoreTable from "@/components/ScoreTable.vue";
export default {
  props: {
    rounds: {
      type: Number,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    /** @type {Array<{name:string, players:Array, scores:Number, scoreHistory: Array}>} */
    teams: {
      type: Array,
      required: true
    }
  },
  components: {
    Round,
    ScoreBoard,
    ScoreTable
    // ProgressTimer
  },
  data() {
    return {
      gameOverFlag: false,
      roundStartFlag: false,
      teamToPlayIdx: 0,
      currentRound: 0,
      winner: null
    };
  },
  mounted() {
    this.gameOverFlag = false;
    this.roundStartFlag = false;
    this.teamToPlayIdx = 0;
    this.currentRound = 0;
    this.winner = null;
  },
  methods: {
    startRound() {
      this.roundStartFlag = true;
    },
    endRound(roundScore) {
      this.roundStartFlag = false;

      // Update Total Scores
      this.teams[this.teamToPlayIdx].scoreHistory.push(roundScore);
      this.teams[this.teamToPlayIdx].score += roundScore;
      if (this.currentRound + 1 == this.rounds && this.teamToPlayIdx == 1) {
        this.gameOver();
      } else {
        if (this.teamToPlayIdx == 1) {
          this.currentRound += 1;
        }
        this.teamToPlayIdx = this.teamToPlayIdx == 0 ? 1 : 0;
      }
    },
    gameOver() {
      this.gameOverFlag = true;
      this.winner =
        this.teams[0].score == this.teams[1].score
          ? null
          : this.teams[0].score > this.teams[1].score
          ? this.teams[0].name
          : this.teams[1].name;
    },
    newGame() {
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style>
.section {
  padding: 1.5rem 1.5rem;
}
.fix-height {
  min-height: 550px;
}
</style>
