<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import characters from './characters';

interface Props {
  char: string;
  duration: number;
}

const UPPER_START = 'upperFlap__start';
const UPPER_END = 'upperFlap__end';
const BOTTOM_START = 'bottomFlap__start';
const BOTTOM_END = 'bottomFlap__end';

const props = defineProps<Props>();
const currentChar = ref(characters[0]);
const nextChar = ref(characters[props.char === characters[0] ? 0 : 1]);
const upperFlapAnimState = ref(UPPER_START);
const bottomFlapAnimState = ref(BOTTOM_START);
const animationAbort = ref<AbortController | null>(null);

const delay = props.duration / characters.length;

// noinspection JSUnusedGlobalSymbols
const animDuration = `${delay / 2}ms`;

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const animate = async () => {
  await wait(delay / 2);
  upperFlapAnimState.value = UPPER_END;
  await wait(delay / 2);
  bottomFlapAnimState.value = BOTTOM_END;
  await wait(delay / 2);
};

const resetAnimation = () => {
  upperFlapAnimState.value = UPPER_START;
  bottomFlapAnimState.value = BOTTOM_START;
};

const runAnimationSequence = async (targetIndex: number) => {
  // Abort any running animation
  if (animationAbort.value) {
    animationAbort.value.abort();
  }
  const abortController = new AbortController();
  animationAbort.value = abortController;

  nextChar.value = characters[targetIndex === 0 ? 0 : 1];
  for (let i = 1; i < targetIndex; i++) {
    if (abortController.signal.aborted) return;
    await animate();
    if (abortController.signal.aborted) return;
    currentChar.value = characters[i];
    resetAnimation();
    nextChar.value = characters[i + 1] ?? characters[i];
  }
  currentChar.value = characters[targetIndex];
  resetAnimation();
};

const getTargetIndex = (char: string) => {
  const findResult = characters.findIndex(el => el === char);
  return findResult === -1 ? 0 : findResult;
};

onMounted(async () => {
  await runAnimationSequence(getTargetIndex(props.char));
});

watch(() => props.char, async (newChar) => {
  await runAnimationSequence(getTargetIndex(newChar));
});
</script>

<template>
  <div class="wrapper">
    <div class="upper">
      <span class="next">
        {{ nextChar }}
      </span>
      <span class="current" :class="upperFlapAnimState">
        {{ currentChar }}
      </span>
    </div>

    <div class="bottom">
      <span class="next" :class="bottomFlapAnimState">
        {{ nextChar }}
      </span>
      <span class="current">
        {{ currentChar }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="css">
span {
  padding: 1rem;
  font-size: var(--fontsize);
  background-color: hsl(0, 0%, 15%);
}

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

.upperFlap__start {
  transform: perspective(5cm) rotateX(0turn);
  filter: brightness(1);
}

.upperFlap__end {
  transform: perspective(5cm) rotateX(-0.25turn);
  filter: brightness(0);
  transition-duration: v-bind('animDuration');
  transition-timing-function: ease-in;
}

.bottomFlap__start {
  transform: perspective(5cm) rotateX(0.25turn);
  filter: brightness(3);
}

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

/* .upper .next {
  color: palevioletred;
}

.bottom .next {
  color: palegoldenrod;
}

.upper .current {
  color: palegreen;
}

.bottom .current {
  color: paleturquoise;
} */
</style>
