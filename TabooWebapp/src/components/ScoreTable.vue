<template name="score-table">
  <b-table
    :data="data"
    :mobile-cards="false"
    :striped="true"
    :bordered="true"
    class="has-text-weight-semibold"
  >
    <template slot-scope="props">
      <b-table-column field="id" label="Round" width="20" numeric centered>
        <span class="">
          {{ props.row.id }}
        </span>
      </b-table-column>
      <b-table-column field="team0" :label="teams[0].name" centered>
        <span :class="scoreColor(props.row.team0)">
          {{ props.row.team0 }}
        </span>
      </b-table-column>
      <b-table-column field="team1" :label="teams[1].name" centered>
        <span :class="scoreColor(props.row.team1)">
          {{ props.row.team1 }}
        </span>
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
export default {
  props: {
    teams: Array,
    teamToPlayIdx: Number,
    currentRound: Number,
    totalRounds: Number
  },
  computed: {
    data() {
      let scores = [];
      for (let round = 0; round < this.currentRound; round++) {
        scores.push({
          id: round + 1,
          team0: this.teams[0].scoreHistory[round]
            ? this.teams[0].scoreHistory[round]
            : 0,
          team1: this.teams[1].scoreHistory[round]
            ? this.teams[1].scoreHistory[round]
            : 0
        });
      }
      if (this.currentRound < this.totalRounds) {
        if (this.teamToPlayIdx == 1) {
          scores.push({
            id: this.currentRound + 1,
            team0: this.teams[0].scoreHistory[this.currentRound],
            team1: "To play now"
          });
        } else {
          scores.push({
            id: this.currentRound + 1,
            team0: "To play now",
            team1: ""
          });
        }
      }
      return scores;
    }
  },
  methods: {
    scoreColor(score) {
      if (score > 0) {
        return " tag is-success";
      } else if (score < 0) {
        return "tag is-danger";
      } else {
        return "";
      }
    }
  },
  mounted() {
    console.log("TABLE MOUNTED");
  }
};
</script>
