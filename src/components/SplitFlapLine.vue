<script setup lang="ts">
import {computed} from 'vue'
import SplitFlapCharChar from './SplitFlapChar.vue'
import {OutlineColor} from '../lib/colors.ts'

interface Props {
  text: string;
  flapMs?: number;
  outlineColor?: OutlineColor;
}

const props = defineProps<Props>()
const emit = defineEmits(['flapStart', 'flapEnd'])
const chars = computed(() => props.text.split(''))

type FlapEventName = 'flapStart' | 'flapEnd';

const numFlapsDuringLatestTick: Record<FlapEventName, number> = {
  flapStart: 0,
  flapEnd: 0,
}
const flapTimeouts: Record<FlapEventName, number | null> = {
  flapStart: null,
  flapEnd: null,
}
const flapGroupDuration = 100

function onFlapEvent(eventName: 'flapStart' | 'flapEnd') {
  numFlapsDuringLatestTick[eventName]++

  if (flapTimeouts[eventName]) {
    clearTimeout(flapTimeouts[eventName])
  }

  flapTimeouts[eventName] = setTimeout(() => {
    if (numFlapsDuringLatestTick[eventName] > 0) {
      emit(eventName)
    }
    numFlapsDuringLatestTick[eventName] = 0
  }, flapGroupDuration)
}
</script>

<template>
  <div class="flex gap-1">
    <SplitFlapCharChar
        v-for="(char, idx) in chars"
        :key="idx"
        :char="char"
        :flap-ms="flapMs"
        :outline-color="outlineColor"
        @flap-start="() => onFlapEvent('flapStart')"
        @flap-end="() => onFlapEvent('flapEnd')"
    />
  </div>
</template>

<style scoped>
</style>

