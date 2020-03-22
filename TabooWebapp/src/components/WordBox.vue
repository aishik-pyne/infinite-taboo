<template name="word-box">
  <div class="">
    <div class="section">
      <h1 class="is-size-2 has-text-weight-bold">{{ this.guessWord }}</h1>
    </div>
    <h3
      class="is-size-3"
      v-for="(tabooWord, tabooWordIdx) in this.tabooWords"
      :key="tabooWordIdx"
    >
      {{ tabooWord }}
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    guessWord: String,
    tabooWords: Array
  }
};
</script>
