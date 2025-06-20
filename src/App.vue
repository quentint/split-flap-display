<script setup lang="ts">
import SplitFlapLine from './components/SplitFlapLine.vue'
import {nextTick, ref, useTemplateRef} from 'vue'
import {makeSyllablePack} from './lib/syllable.ts'
import flapAudio from '/src/assets/flap.mp3'
import popAudio from '/src/assets/pop.mp3'
import ConfettiExplosion from 'vue-confetti-explosion'

const s = ref('  ')
const flapAudioElement = useTemplateRef<HTMLAudioElement>('flap')
const popAudioElement = useTemplateRef<HTMLAudioElement>('pop')
const confetti = ref(false)
const settingsVisible = ref(false)
const hardSyllables = ref(false)
const numSyllables = ref(1)

const onFlapStart = () => {
  if (!flapAudioElement.value) {
    return
  }
  flapAudioElement.value.currentTime = 0
  flapAudioElement.value.play()
}

const showNewSyllable = () => {
  s.value = makeSyllablePack(numSyllables.value, hardSyllables.value).toUpperCase()
}


const onSuccess = async () => {
  if (popAudioElement.value) {
    popAudioElement.value.currentTime = 0
    popAudioElement.value.play()
  }

  confetti.value = false
  await nextTick()
  confetti.value = true
}
</script>

<template>
  <audio ref="flap" :src="flapAudio"></audio>
  <audio ref="pop" :src="popAudio"></audio>
  <div class="absolute inset-0 overflow-clip">
    <ConfettiExplosion v-if="confetti" class="absolute left-1/2 top-1/2"/>
  </div>
  <div class="absolute inset-0 flex items-center justify-center">
    <SplitFlapLine :style="{opacity: s.trim().length ? 1 : 0}"
                   :flap-ms="150"
                   :text="s.toUpperCase()"
                   @click="showNewSyllable"
                   @flap-start="onFlapStart"/>
    <button class="absolute bottom-0 left-0 size-[10dvw]" @click="settingsVisible = !settingsVisible"></button>
    <button class="absolute bottom-0 right-0 size-[10dvw]" @click="onSuccess"></button>
  </div>
  <div v-if="settingsVisible" class="absolute left-0 right-0 top-0 flex flex-wrap gap-4 p-4 justify-center items-center">
    <label><input type="checkbox" v-model="hardSyllables"> Syllabes difficiles</label>
    <label>Nombre de syllables <input type="number" v-model="numSyllables" class="w-12 border"></label>
  </div>
</template>

<style scoped lang="css">
</style>
