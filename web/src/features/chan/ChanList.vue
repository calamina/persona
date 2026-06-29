<script setup lang="ts">
import type { ChanDisplay } from './chan.model.ts'
import { ref } from 'vue'
import { api } from '../../utils/api-client.ts'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import ChanItem from './ChanItem.vue'
import LayoutList from '../../layouts/LayoutList.vue'
import TabList, { type Tab } from '../../components/TabList.vue'

const chans = ref<ChanDisplay[]>([])

const BOARDS = ['g', 'wg'] as const
type Board = (typeof BOARDS)[number]
const board = ref<Board>('g')

const fetchChans = async (newBoard?: Board) => {
  board.value = newBoard ?? 'g'
  const res = await api.chan.$get({ query: { board: board.value } })
  const { data } = await res.json()
  if (data) chans.value = data
}

fetchChans()

const tabs: Tab[] = BOARDS.map((b) => ({
  name: b,
  action: () => fetchChans(b),
}))
</script>

<template>
  <LayoutWindow title="4chan" icon="chan">
    <template #tabs>
      <TabList :tabs />
    </template>

    <Transition name="load" mode="out-in">
      <LayoutList :key="board">
        <ChanItem v-for="chan in chans" :key="chan.id" :chan="chan" />
      </LayoutList>
    </Transition>
  </LayoutWindow>
</template>
