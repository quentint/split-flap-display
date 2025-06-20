<script setup lang="ts">
import { computed, defineEmits } from 'vue';
import SplitFlapCharChar from './SplitFlapChar.vue';

interface Props {
  text: string;
  flapMs?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['flapStart', 'flapEnd']);
const chars = computed(() => props.text.split(''));

type FlapEventName = 'flapStart' | 'flapEnd';

const numFlapsDuringLatestTick: Record<FlapEventName, number> = {
  flapStart: 0,
  flapEnd: 0,
};
const flapTimeouts: Record<FlapEventName, number|null> = {
  flapStart: null,
  flapEnd: null,
};
const flapGroupDuration = 100

function onFlapEvent(eventName: 'flapStart'|'flapEnd') {
  numFlapsDuringLatestTick[eventName]++;

  if (flapTimeouts[eventName]) {
    clearTimeout(flapTimeouts[eventName]);
  }

  flapTimeouts[eventName] = setTimeout(() => {
    if (numFlapsDuringLatestTick[eventName] > 0) {
      emit(eventName);
    }
    numFlapsDuringLatestTick[eventName] = 0;
  }, flapGroupDuration);
}
</script>

<template>
  <div class="split-flap-line">
    <SplitFlapCharChar
      v-for="(char, idx) in chars"
      :key="idx"
      :char="char"
      :flapMs="flapMs"
      @flap-start="() => onFlapEvent('flapStart')"
      @flap-end="() => onFlapEvent('flapEnd')"
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

