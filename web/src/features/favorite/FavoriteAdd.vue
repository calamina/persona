<script setup lang="ts">
import { ref } from 'vue'
import FieldBase from '../../components/FieldBase.vue'
import { addFavorite } from './favorite.service'
import { cleanUrl } from '../../utils/url.ts'
import ButtonLoading from '../../components/ButtonLoading.vue'
import { useFavoriteStore } from './favorite.store.ts'

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
  <form ref="addFavoriteForm" class="form" @submit.prevent="create()">
    <FieldBase id="url" v-model="url" :required="false" />
    <ButtonLoading :loading label="Add favorite" icon="favoriteAdd" />
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-flow: column;
  border-radius: var(--spacing);
  height: fit-content;
  border: var(--border);
  background-color: var(--element);
  padding: var(--spacing);
  width: 100%;
  overflow-y: auto;
  scrollbar-color: var(--color) transparent;
}
</style>
