<script setup lang="ts">
import SplitFlap from './components/SplitFlap.vue';
const string = 'Hello, World!';
</script>

<template>
  <pre>
    <SplitFlap v-for="c in string.toUpperCase()" :char="c" :duration="5000" />
  </pre>
</template>

<style scoped lang="css">
pre {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  height: 100%;
  width: fit-content;
  margin: 0;
  padding: 0;
}
</style>
