<script setup lang="ts">
import { ref } from 'vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import ChanItem from './ChanItem.vue'
import LayoutList from '../../layouts/LayoutList.vue'
import TabList, { type Tab } from '../../components/TabList.vue'
import { useQuery } from '@tanstack/vue-query'
import LoadingContent from '../../components/LoadingContent.vue'
import { getChanCatalog } from './chan.service.ts'

const BOARDS = ['g', 'wg'] as const
type Board = (typeof BOARDS)[number]
const board = ref<Board>('g')

const { isLoading: loading, data: chans } = useQuery({
  queryKey: ['chans', board],
  queryFn: () => getChanCatalog(board.value),
  staleTime: 1000 * 60 * 3,
  gcTime: 1000 * 60 * 4,
})

const tabs: Tab[] = BOARDS.map((b) => ({
  name: b,
  action: () => (board.value = b),
}))
</script>

<template>
  <LayoutWindow title="4chan" icon="chan">
    <template #tabs>
      <TabList :tabs />
    </template>

    <Transition name="load" mode="out-in">
      <LoadingContent v-if="loading" />
      <LayoutList v-else :key="board">
        <ChanItem v-for="chan in chans" :key="chan.id" :chan="chan" />
      </LayoutList>
    </Transition>
  </LayoutWindow>
</template>
