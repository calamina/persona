<script setup lang="ts">
import FavoriteItem from './FavoriteItem.vue'
import FavoriteAdd from './FavoriteAdd.vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import LayoutList from '../../layouts/LayoutList.vue'
import { getFavorites } from './favorite.service.ts'
import { useQuery } from '@tanstack/vue-query'

const { isLoading: _todosLoading, data: favorites } = useQuery({
  queryKey: ['favorites'],
  queryFn: getFavorites,
})
</script>

<template>
  <LayoutWindow title="Favorites" icon="favorite">
    <FavoriteAdd />
    <LayoutList>
      <FavoriteItem v-for="favorite in favorites" :key="favorite.id" :favorite="favorite" />
    </LayoutList>
  </LayoutWindow>
</template>
