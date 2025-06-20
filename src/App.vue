<script setup lang="ts">
import SplitFlapLine from './components/SplitFlapLine.vue';
import {ref} from 'vue'
const s = ref('Hello World!');

const reverse = () => {
  s.value = s.value.split('').reverse().join('');
};
</script>

<template>
  <div class="app-wrapper">
    <SplitFlapLine :flap-ms="1000"
                   :text="s.toUpperCase()"
                   @flap-start="() => console.log('start')"
                   @flap-end="() => console.log('end')"/>
    <button @click="reverse">Reverse</button>
    <span>{{ s }}</span>
  </div>
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
