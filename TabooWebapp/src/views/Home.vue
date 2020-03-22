<template name="home">
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="section has-text-centered">
          <h1 class="is-size-2">INFINITE TABOO</h1>
        </div>
        <div class="section">
          <div
            v-for="(team, teamIdx) in teams"
            :key="teamIdx"
            :label="team.name"
          >
            <h1 class="teamLabel has-text-weight-semibold is-size-4">
              {{ team.name }}
            </h1>

            <b-field
              class="field"
              v-for="(player, playerIdx) in team.players"
              :key="playerIdx"
              :message="player.error ? 'The field can\'t be empty' : ''"
              :type="player.error ? 'is-danger' : ''"
            >
              <b-input
                class="is-medium"
                size="is-medium"
                :placeholder="'Player ' + (playerIdx + 1)"
                debounce="1000"
                v-model="player.name"
              ></b-input>
            </b-field>
          </div>

          <!-- ROUNDS SLIDER -->
          <h1 class="teamLabel has-text-weight-semibold is-size-4">
            Rounds
          </h1>
          <b-field>
            <b-slider size="is-large" :min="1" :max="10" v-model="rounds">
              <template v-for="val in [1, 4, 7, 10]">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template>
            </b-slider>
          </b-field>

          <!-- TIME SLIDER -->
          <h1 class="teamLabel has-text-weight-semibold is-size-4">
            Time per round
          </h1>
          <b-field>
            <b-slider
              size="is-large"
              :min="1"
              :max="120"
              :step="15"
              v-model="time"
              ><template v-for="val in [30, 60, 90, 120]">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template>
            </b-slider>
          </b-field>
        </div>
        <div class="section has-text-centered">
          <div class="columns is-mobile">
            <div class="column is-half">
              <b-button
                class="has-text-weight-semibold"
                type="is-success"
                size="is-large"
                expanded
                @click="resetInputs"
              >
                RESET
              </b-button>
            </div>
            <div class="column">
              <b-button
                class="has-text-weight-semibold"
                type="is-primary"
                size="is-large"
                expanded
                @click="startGame"
              >
                START
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import faker from "faker";
// import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      rounds: 4,
      time: 60,
      teams: [
        {
          name: "Team A",
          score: 0,
          scoreHistory: [],
          players: [
            { name: faker.name.findName(), error: false },
            { name: faker.name.findName(), error: false }
          ]
        },
        {
          name: "Team B",
          score: 0,
          scoreHistory: [],
          players: [
            { name: faker.name.findName(), error: false },
            { name: faker.name.findName(), error: false }
          ]
        }
      ]
    };
  },
  methods: {
    resetInputs() {
      this.teams.forEach(team => {
        team.players.forEach(player => {
          player.name = "";
          player.error = false;
        });
      });
    },
    validateInputs() {
      let validFlag = true;
      this.teams.forEach(team => {
        team.players.forEach(player => {
          if (!player.name) {
            player.error = true;
            validFlag = false;
          } else {
            player.error = false;
          }
        });
      });
      return validFlag;
    },
    startGame() {
      if (this.validateInputs()) {
        this.$router.push({
          name: "game",
          params: {
            teams: this.teams,
            rounds: this.rounds,
            time: this.time
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.section {
  padding: 20px;
}
.teamLabel {
  margin: 15px 0px;
}
.container {
  padding: 10px;
}
</style>
