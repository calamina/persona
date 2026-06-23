<script setup lang="ts">
import { ref } from 'vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import { api } from '../../utils/api-client.ts'
import ChanItem from './ChanItem.vue'
import type { ChanDisplay } from './chan.model.ts'
import IconBase from '../../components/icons/IconBase.vue'

// const BOARDS = ['g', 'wg', 'v', 'a', 'tv', 'p'] as const
const BOARDS = ['g', 'wg', 'v'] as const
type Board = (typeof BOARDS)[number]

const board = ref<Board>('g')
const chans = ref<ChanDisplay[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const fetchChans = async (newBoard?: Board) => {
  isLoading.value = true
  error.value = null
  board.value = newBoard ?? 'g'
  const res = await api.chan.$get({ query: { board: board.value } })
  const { data } = await res.json()
  if (data) chans.value = data
  isLoading.value = false
}

fetchChans()
</script>

<template>
  <div class="chans">
    <LayoutWindow title="4chan">
      <template v-slot:tabs>
        <div class="tabs">
          <button
            v-for="b in BOARDS"
            class="tab"
            :class="{ active: board === b }"
            @click="fetchChans(b)"
          >
            {{ b }}
          </button>
        </div>
      </template>

      <Transition mode="out-in">
        <div v-if="isLoading" class="loading">
          Loading
          <IconBase name="loading" />
        </div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div class="list" v-else>
          <ChanItem v-for="chan in chans" :key="chan.id" :chan="chan" />
        </div>
      </Transition>
    </LayoutWindow>
  </div>
</template>

<style scoped>
.chans {
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  gap: var(--spacing);
  overflow: hidden;

  @media (max-width: 1250px) {
    height: fit-content;
    max-width: unset;
  }
}

.loading {
  display: flex;
  flex-flow: column;
  height: 100%;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
}

.big {
  flex-shrink: 0;
}

.tabs {
  display: flex;
  height: var(--icon-size);
  border-bottom: var(--border);
}

.tab {
  width: 100%;
  border: none;
  outline: none;
  border-right: var(--border);
  background-color: transparent;
  cursor: pointer;
  color: var(--color-dim);

  &:last-child {
    border: none;
  }

  &:hover,
  &:focus-within,
  &.active {
    color: var(--color);
    background-color: var(--element-focus);
  }
}

.list {
  /* flex-shrink: 1; */
  display: flex;
  flex-flow: column;
  /* overflow: hidden; */
  padding: var(--spacing-list-vr) var(--spacing-list-hr);
  gap: var(--list-gap);
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.085s ease-out,
    transform 0.085s ease-out;
}

.v-enter-from {
  opacity: 0.5;
  transform: translateY(-0.3rem);
}
.v-leave-to {
  opacity: 0;
  transform: translateY(0.3rem);
}
</style>
