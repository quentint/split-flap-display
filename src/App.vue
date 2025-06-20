<script setup lang="ts">
import SplitFlapLine from './components/SplitFlapLine.vue';
import {ref, useTemplateRef} from 'vue'
const s = ref('Hello World!');

const reverse = () => {
  s.value = s.value.split('').reverse().join('');
};

const audio = useTemplateRef<HTMLAudioElement>('audio');

const onFlapStart = () => {
  if (!audio.value) {
    return;
  }
  audio.value.currentTime = 0;
  audio.value.play();
};
</script>

<template>
  <div class="app-wrapper">
    <SplitFlapLine :flap-ms="150"
                   :text="s.toUpperCase()"
                   @flap-start="onFlapStart" />
    <button @click="reverse">Reverse</button>
    <span>{{ s }}</span>
  </div>
  <audio ref="audio" src="/flap.mp3"></audio>
</template>

<style scoped lang="css">
.app-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  height: 100%;
  width: fit-content;
  margin: 0;
  padding: 0;
}
</style>
