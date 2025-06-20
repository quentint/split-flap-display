<script setup lang="ts">
import { computed } from 'vue';
import SplitFlap from './SplitFlap.vue';

interface Props {
  text: string;
  flapMs?: number;
}

const props = defineProps<Props>();
const chars = computed(() => props.text.split(''));
</script>

<template>
  <div class="split-flap-line">
    <SplitFlap
      v-for="(char, idx) in chars"
      :key="idx"
      :char="char"
      :flapMs="flapMs"
    />
  </div>
</template>

<style scoped>
.split-flap-line {
  display: flex;
  flex-direction: row;
  gap: 0.25em;
}
</style>

