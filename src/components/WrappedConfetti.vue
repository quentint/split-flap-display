<script setup lang="ts">
import ConfettiExplosion from 'vue-confetti-explosion'
import {nextTick, ref} from 'vue'

interface Props {
  colors: string[],
}

defineProps<Props>()

const confetti = ref(false)

const pop = async () => {
  confetti.value = false
  await nextTick()
  confetti.value = true
}

defineExpose({
  pop,
})
</script>

<template>
  <ConfettiExplosion v-if="confetti" :colors="colors"/>
</template>

<style scoped lang="css">

</style>