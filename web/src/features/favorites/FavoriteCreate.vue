<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import FieldBase from '../../components/FieldBase.vue'
import { createFavorite } from './favorites.service'
import z from 'zod'
import { cleanUrl } from '../../utils/url.ts'
import ButtonLoading from '../../components/ButtonLoading.vue'
import { useFavoriteStore } from './favorite.store.ts'

const store = useFavoriteStore()
const createFavoriteForm = useTemplateRef('createFavoriteForm')
const loading = ref(false)

const schema = z.object({
  url: z.url(),
})

const create = async () => {
  loading.value = true
  const formData = new FormData(createFavoriteForm?.value ?? undefined)
  const formDataObj = Object.fromEntries(formData.entries()) as { url: string }
  cleanUrl(formDataObj.url)
  const parsedData = schema.parse(formDataObj)
  const { data } = await createFavorite(parsedData)
  if (data) {
    store.clearFavoriteCache()
    store.loadFavorites(true)
  }
  loading.value = false
}
</script>

<template>
  <form ref="createFavoriteForm" class="form" @submit.prevent="create()">
    <!-- <ButtonBase @click="" slot="button" label="Add favorite" icon="favoriteAdd" id="openCreateFavoriteDialog" /> -->
    <!-- <DialogForm id="favoriteCreateContainer" submitLabel="Add"> -->
    <FieldBase id="url" :required="false" type="url" errorMessage="Must be a valid url" />
    <!-- </DialogForm> -->
    <ButtonLoading :loading label="Add favorite" icon="favoriteAdd" />
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-flow: column;
  border-radius: 0.6rem;
  height: fit-content;
  border: 2.5px solid var(--border);
  background-color: var(--element);
  padding: 0.6rem;
  max-height: 50vh;
  overflow-y: auto;
  scrollbar-color: var(--color) transparent;
}
</style>
