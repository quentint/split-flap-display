<script setup lang="ts">
import SplitFlapLine from './components/SplitFlapLine.vue';
import {ref, useTemplateRef} from 'vue'
import {makeSyllablePack} from './lib/syllable.ts'
import flapAudio from '/src/assets/flap.mp3';

const s = ref('ABC');

const audio = useTemplateRef<HTMLAudioElement>('audio');

const onFlapStart = () => {
  if (!audio.value) {
    return;
  }
  audio.value.currentTime = 0;
  audio.value.play();
};

const showNewSyllable = () => {
  s.value = makeSyllablePack(2).toUpperCase();
};
</script>

<template>
  <div class="app-wrapper w-[100dvw] h-[100dvh] flex items-center justify-center" @click="showNewSyllable">
    <SplitFlapLine v-if="s.length" :flap-ms="150"
                   :text="s.toUpperCase()"
                   @flap-start="onFlapStart" />
  </div>
  <audio ref="audio" :src="flapAudio"></audio>
</template>

<style scoped lang="css">
</style>
