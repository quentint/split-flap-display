<script setup lang="ts">
import SplitFlap from './components/SplitFlap.vue';
import {ref} from 'vue'
const s = ref('Hello, World!');

const reverse = () => {
  s.value = s.value.split('').reverse().join('');
};
</script>

<template>
  <pre>
    <SplitFlap v-for="c in s.toUpperCase()" :char="c" :duration="3000" />
    <button @click="reverse">Reverse</button>
    <span>{{ s }}</span>
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
