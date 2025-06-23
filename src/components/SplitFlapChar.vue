<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {characters} from '../lib/syllable.ts'

interface Props {
  char: string;
  flapMs?: number;
}

const UPPER_START = 'upperFlap__start'
const UPPER_END = 'upperFlap__end'
const BOTTOM_START = 'bottomFlap__start'
const BOTTOM_END = 'bottomFlap__end'

const props = defineProps<Props>()
const currentChar = ref(characters[0])
const nextChar = ref(characters[props.char === characters[0] ? 0 : 1])
const upperFlapAnimState = ref(UPPER_START)
const bottomFlapAnimState = ref(BOTTOM_START)
const animationId = ref(0)
const emit = defineEmits(['flapStart', 'flapEnd'])
const delay = computed(() => props.flapMs ?? 100)

// noinspection JSUnusedGlobalSymbols
const animDuration = computed(() => `${delay.value / 2}ms`)

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const animate = async () => {
  emit('flapStart')
  await wait(delay.value / 2)
  upperFlapAnimState.value = UPPER_END
  await wait(delay.value / 2)
  bottomFlapAnimState.value = BOTTOM_END
  await wait(delay.value / 2)
  emit('flapEnd')
}

const resetAnimation = () => {
  upperFlapAnimState.value = UPPER_START
  bottomFlapAnimState.value = BOTTOM_START
}

const performStep = async (
  myId: number,
  charIndex: number,
  nextIndex: number
) => {
  if (myId !== animationId.value) {
    return false
  }

  await animate()

  if (myId !== animationId.value) {
    return false
  }

  currentChar.value = characters[charIndex]
  resetAnimation()
  nextChar.value = characters[nextIndex] ?? characters[charIndex]

  return true
}

const runAnimationSequence = async (targetIndex: number) => {
  animationId.value++
  const myId = animationId.value

  // Find the current character's index
  const currentIndex = characters.findIndex(el => el === currentChar.value)
  let fromIndex = currentIndex === -1 ? 0 : currentIndex

  // If already at target, just update nextChar and return
  if (fromIndex === targetIndex) {
    nextChar.value = characters[targetIndex]
    return
  }

  // Determine direction and number of steps (always forward, wrap around)
  let steps = (targetIndex - fromIndex + characters.length) % characters.length
  for (let i = 1; i <= steps; i++) {
    const charIdx = (fromIndex + i) % characters.length
    const nextIdx = (fromIndex + i + 1) % characters.length
    const continued = await performStep(myId, charIdx, nextIdx)
    if (!continued) {
      return
    }
  }

  // Play the final animation before showing the target character
  currentChar.value = characters[targetIndex]
  resetAnimation()
  nextChar.value = characters[targetIndex]
}

const getTargetIndex = (char: string) => {
  const findResult = characters.findIndex(el => el === char)
  return findResult === -1 ? 0 : findResult
}

onMounted(() => {
  runAnimationSequence(getTargetIndex(props.char))
})

watch(() => props.char, (newChar) => {
  runAnimationSequence(getTargetIndex(newChar))
})
</script>

<template>
  <div class="wrapper text-8xl font-mono whitespace-pre cursor-default">
    <div class="upper">
      <span class="next bg-stone-800 px-6 py-4">
        {{ nextChar }}
      </span>
      <span class="current bg-stone-800 px-6 py-4" :class="upperFlapAnimState">
        {{ currentChar }}
      </span>
    </div>
    <div class="bottom">
      <span class="next bg-stone-800 px-6 py-4" :class="bottomFlapAnimState">
        {{ nextChar }}
      </span>
      <span class="current bg-stone-800 px-6 py-4">
        {{ currentChar }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="css">
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.next,
.current {
  border-radius: 0.5rem;
}

.upper .next,
.bottom .current {
  z-index: 1;
}

.upper .current,
.bottom .next {
  z-index: 2;
}

.upper,
.bottom {
  display: flex;
  flex-direction: column;
}

.bottom {
  position: absolute;
}

.current {
  position: absolute;
}

/*noinspection CssUnusedSymbol*/
.upperFlap__start {
  transform: perspective(5cm) rotateX(0turn);
  filter: brightness(1);
}

/*noinspection CssUnusedSymbol*/
.upperFlap__end {
  transform: perspective(5cm) rotateX(-0.25turn);
  filter: brightness(0);
  transition-duration: v-bind('animDuration');
  transition-timing-function: ease-in;
}

/*noinspection CssUnusedSymbol*/
.bottomFlap__start {
  transform: perspective(5cm) rotateX(0.25turn);
  filter: brightness(3);
}

/*noinspection CssUnusedSymbol*/
.bottomFlap__end {
  transform: perspective(5cm) rotateX(0turn);
  filter: brightness(1);
  transition-duration: v-bind('animDuration');
  transition-timing-function: ease-out;
}

.upper * {
  clip-path: inset(0 0 50% 0);
}

.bottom * {
  clip-path: inset(50% 0 0 0);
}
</style>
