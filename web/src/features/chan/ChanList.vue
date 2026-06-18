<script setup lang="ts">
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import { api } from '../../utils/api-client.ts'
import ChanItem from './ChanItem.vue'

const res = await api.chan.$get()
const { data } = await res.json()
</script>

<template>
  <div class="favorites">
    <LayoutWindow title="4Chan">
      <ChanItem v-for="chan in data" :key="chan.id" :chan="chan" />
    </LayoutWindow>
  </div>
</template>

<style scoped>
.favorites {
  display: flex;
  flex-flow: column;
  gap: 0.6rem;
  max-width: 25rem;
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 100%;
  @media (max-width: 1250px) {
    height: fit-content;
    max-width: unset;
  }
}

.big {
  flex-shrink: 0;
}
</style>
