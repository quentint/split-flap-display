<script setup lang="ts">
import SplitFlapLine from './components/SplitFlapLine.vue'
import {nextTick, ref, useTemplateRef} from 'vue'
import {makeSyllablePack} from './lib/syllable.ts'
import flapAudio from '/src/assets/flap.mp3'
import ConfettiExplosion from 'vue-confetti-explosion'

const s = ref('')

const audio = useTemplateRef<HTMLAudioElement>('audio')

const onFlapStart = () => {
  if (!audio.value) {
    return
  }
  audio.value.currentTime = 0
  audio.value.play()
}

const showNewSyllable = () => {
  s.value = makeSyllablePack(2).toUpperCase()
}

const confetti = ref(false)

const onSuccess = async (e: Event) => {
  e.stopImmediatePropagation()

  confetti.value = false
  await nextTick()
  confetti.value = true
}
</script>

<template>
  <audio ref="audio" :src="flapAudio"></audio>
  <div class="absolute inset-0 overflow-clip">
    <ConfettiExplosion v-if="confetti" class="absolute left-1/2 top-1/2"/>
  </div>
  <div class="absolute inset-0 flex items-center justify-center" @click="showNewSyllable">
    <SplitFlapLine v-if="s.length"
                   :flap-ms="150"
                   :text="s.toUpperCase()"
                   @flap-start="onFlapStart"/>
    <button class="absolute bottom-0 right-0 size-[10dvw]" @click="onSuccess"></button>
  </div>
</template>

<style scoped lang="css">
</style>
