<template name="score-board">
  <nav class="level has-text-weight-semibold is-mobile">
    <div class="level-item has-text-centered ">
      <div class="">
        <p class="heading is-size-5">{{ teams[0].name }}</p>
        <p class="title">{{ teams[0].score }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading is-size-5">Round</p>
        <p class="title">{{ currentRound + 1 }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading is-size-5">{{ teams[1].name }}</p>
        <p class="title">{{ teams[1].score }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    currentRound: { type: Number, required: true },
    teams: { type: Array, required: true }
  }
};
</script>
<style scoped></style>
