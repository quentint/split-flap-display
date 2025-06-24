<script setup lang="ts">
import SplitFlapLine from './components/SplitFlapLine.vue'
import {computed, ref, useTemplateRef} from 'vue'
import {makeSyllablePack, SyllablePack} from './lib/syllable.ts'
import flapAudio from '/src/assets/flap.mp3'
import popAudio from '/src/assets/pop.mp3'
import {getColorHex} from './lib/colors.ts'
import WrappedConfetti from './components/WrappedConfetti.vue'
import {useFullscreen} from '@vueuse/core'

const pack = ref<SyllablePack>([{text: '  ', color: 'none'}])
const flapAudioElement = useTemplateRef<HTMLAudioElement>('flap')
const popAudioElement = useTemplateRef<HTMLAudioElement>('pop')
const settingsVisible = ref(false)
const hardSyllables = ref(false)
const numSyllables = ref(1)
const confettiComponents = useTemplateRef<typeof WrappedConfetti[]>('confetti')
const { toggle: toggleFullscreen } = useFullscreen()

const speed = ref<'slow' | 'normal' | 'fast'>('normal')
type Speed = typeof speed.value

const speedNameToMs: Record<Speed, number> = {
  slow: 500,
  normal: 250,
  fast: 100,
}

const onFlapStart = () => {
  if (!flapAudioElement.value) {
    return
  }
  flapAudioElement.value.currentTime = 0
  flapAudioElement.value.play()
}

const showNewSyllable = () => {
  pack.value = makeSyllablePack(numSyllables.value, hardSyllables.value)
}


const onSuccess = () => {
  if (popAudioElement.value) {
    popAudioElement.value.currentTime = 0
    popAudioElement.value.play()
  }

  if (confettiComponents.value) {
    for (const confetti of confettiComponents.value) {
      confetti.pop()
    }
  }
}

const confettiColors = computed(() => {
  return pack.value.map(syllable => syllable.color ? getColorHex(syllable.color) : 'transparent')
})
</script>

<template>
  <audio ref="flap" :src="flapAudio"></audio>
  <audio ref="pop" :src="popAudio"></audio>

  <div class="absolute inset-0 overflow-clip">
    <div v-for="i in numSyllables" class="absolute top-1/2" :style="{ left: `${i * 100 / (numSyllables + 1)}%` }">
      <WrappedConfetti ref="confetti" :colors="confettiColors"/>
    </div>
  </div>

  <div class="absolute inset-0 flex items-center justify-center">
    <div class="flex gap-2 flex-wrap justify-center p-4">
      <SplitFlapLine v-for="syllable in pack"
                     :flap-ms="speedNameToMs[speed]"
                     :outline-color="syllable.color"
                     :style="{opacity: syllable.text.trim().length ? 1 : 0}"
                     :text="syllable.text.toUpperCase()"
                     @click="showNewSyllable"
                     @flap-start="onFlapStart"/>
    </div>
    <button class="absolute bottom-0 left-0 size-[10dvw]" @click="settingsVisible = !settingsVisible"></button>
    <button class="absolute bottom-0 right-0 size-[10dvw]" @click="onSuccess"></button>
  </div>

  <div v-if="settingsVisible"
       class="absolute left-0 right-0 top-0 flex flex-wrap gap-6 p-4 justify-center items-center">
    <label><input type="checkbox" v-model="hardSyllables"> Syllabes difficiles</label>
    <label>Nombre de syllables <input type="number" v-model="numSyllables" class="w-12 border"></label>
    <div class="text-xl flex gap-2">
      <label><input v-model="speed" type="radio" name="speed" value="slow">🐢</label>
      <label><input v-model="speed" type="radio" name="speed" value="normal">👣</label>
      <label><input v-model="speed" type="radio" name="speed" value="fast">🐇</label>
    </div>
    <button @click="toggleFullscreen">↕️</button>
  </div>
</template>

<style scoped lang="css">
</style>
