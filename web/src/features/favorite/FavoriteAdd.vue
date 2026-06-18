<script setup lang="ts">
import { ref } from 'vue'
import { addFavorite } from './favorite.service'
import { cleanUrl } from '../../utils/url.ts'
import { useFavoriteStore } from './favorite.store.ts'
import FieldAction from '../../components/FieldAction.vue'

const store = useFavoriteStore()

const loading = ref(false)
const url = ref('')

const create = async () => {
  if (!url.value) return

  loading.value = true
  url.value = cleanUrl(url.value)

  const { data } = await addFavorite(url.value)
  if (data) {
    store.clearFavoriteCache()
    store.loadFavorites(true)
    url.value = ''
  }

  loading.value = false
}
</script>

<template>
  <FieldAction
    v-model="url"
    :action="create"
    :loading
    icon="favoriteAdd"
    label="Add"
    placeholder="add link ..."
  />
</template>
