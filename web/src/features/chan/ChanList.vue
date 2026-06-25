<script setup lang="ts">
import { ref } from 'vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import { api } from '../../utils/api-client.ts'
import ChanItem from './ChanItem.vue'
import type { ChanDisplay } from './chan.model.ts'
import IconBase from '../../components/icons/IconBase.vue'
import LayoutList from '../../layouts/LayoutList.vue'
import TabList, { type Tab } from '../../components/TabList.vue'
import LoadingContent from '../../components/LoadingContent.vue'

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

const tabs: Tab[] = BOARDS.map((b) => ({
  name: b,
  action: () => fetchChans(b),
}))
</script>

<template>
  <div class="chans">
    <LayoutWindow title="4chan">
      <template #tabs>
        <TabList :tabs />
      </template>

      <Transition mode="out-in">
        <LoadingContent v-if="isLoading" />
        <div v-else-if="error" class="error">{{ error }}</div>
        <LayoutList v-else>
          <ChanItem v-for="chan in chans" :key="chan.id" :chan="chan" />
        </LayoutList>
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

.big {
  flex-shrink: 0;
}

.tabs {
  display: flex;
  height: var(--icon-size);
  border-bottom: var(--border);
  background-color: var(--tab-wrap-bg);
}

.tab {
  width: 100%;
  border: none;
  outline: none;
  border-right: var(--border);
  background-color: transparent;
  cursor: pointer;
  color: var(--color-dimmer);

  &:last-child {
    border: none;
  }

  &:hover,
  &:focus-within,
  &.active {
    color: var(--color);
    background-color: var(--tab-active-bg);
  }
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
