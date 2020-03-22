const state = {
  teams: [
    {
      name: "Team 1",
      players: [{ name: "Player1" }, { name: "Player2" }]
    },
    {
      name: "Team 2",
      players: [{ name: "Player1" }, { name: "Player2" }]
    }
  ]
};
const getters = {};
const mutations = {
  SET_PLAYER(state, teamIdx, playerIdx, player) {
    state.teams[teamIdx].players[playerIdx] = {
      name: player,
      error: player != ""
    };
  }
};
const actions = {
  updatePlayer(teamIdx, playerIdx, player) {
    if (teamIdx >= 0 && teamIdx < this.teams.length) {
      console.log("hgas");
      if (playerIdx in this.teams[teamIdx]) {
        this.context.commit("SET_PLAYER", { teamIdx, playerIdx, player });
      }
    }
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
