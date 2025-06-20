<script setup lang="ts">
import SplitFlapLine from './components/SplitFlapLine.vue';
import {ref, useTemplateRef} from 'vue'
import {makeSimpleSyllable} from './lib/syllable.ts'
import flapAudio from '/src/assets/flap.mp3';

const s = ref('  ');

const audio = useTemplateRef<HTMLAudioElement>('audio');

const onFlapStart = () => {
  if (!audio.value) {
    return;
  }
  audio.value.currentTime = 0;
  audio.value.play();
};

const showNewSyllable = () => {
  s.value = makeSimpleSyllable().toUpperCase();
};
</script>

<template>
  <div class="app-wrapper" @click="showNewSyllable">
    <SplitFlapLine :flap-ms="150"
                   :text="s.toUpperCase()"
                   @flap-start="onFlapStart" />
  </div>
  <audio ref="audio" :src="flapAudio"></audio>
</template>

<style scoped lang="css">
.app-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
