<script setup lang="ts">
import { ref } from 'vue'
import { useYoutubeStore } from '../youtube.store'
import type { Channel } from '../youtube.model'
import { addChannel, searchChannel } from '../youtube.service'
import ButtonLoading from '../../../components/ButtonLoading.vue'
import FieldBase from '../../../components/FieldBase.vue'
import ButtonBase from '../../../components/ButtonBase.vue'

const store = useYoutubeStore()

const loadingSearch = ref(false)
const loadingAdd = ref(false)
const query = ref('')
const result = ref<Channel | null | undefined>(null)

const search = async () => {
  if (!query.value.length) return
  loadingSearch.value = true
  const { data } = await searchChannel(query.value)
  if (data) result.value = data
  loadingSearch.value = false
}

const cancel = () => {
  result.value = null
  query.value = ''
}

const subscribe = async () => {
  if (!result.value) return
  loadingAdd.value = true

  const { data } = await addChannel(result.value)

  if (data) {
    store.clearVideoCache()
    await store.loadChannels()
    await store.loadVideos(true)
    cancel()
  }

  loadingAdd.value = false
}
</script>

<template>
  <form v-if="!result" class="element" @submit.prevent="search()">
    <FieldBase id="query" v-model="query" :required="false" type="text" />
    <ButtonLoading :loading="loadingSearch" label="Seach channel" icon="favoriteSearch" />
  </form>
  <div v-if="result" class="element result">
    <a :href="result.url" :title="result.name">
      <img
        :src="result.iconURL"
        :alt="result.name + ' channel icon'"
        referrerpolicy="no-referrer"
      />
      <p class="name">{{ result.name }}</p>
    </a>
    <div class="actions">
      <ButtonBase class="button" @click="cancel()" label="Cancel" icon="favoriteDelete" />
      <ButtonLoading
        class="button"
        :loading="loadingAdd"
        @click="subscribe()"
        label="Subscribe"
        icon="favoriteAdd"
      />
    </div>
  </div>
</template>

<style scoped>
.element {
  display: flex;
  flex-flow: column;
  border-radius: 0.6rem;
  height: fit-content;
  border: var(--border-width) solid var(--border);
  background-color: var(--element);
  padding: 0.6rem;
  width: 100%;
}

.result {
  display: flex;
  flex-flow: column;
  padding: 0;
}

a {
  display: flex;
  flex-flow: column;
  text-decoration: none;
  overflow: hidden;
}

img {
  border-top-left-radius: calc(0.6rem - var(--border-width));
  border-top-right-radius: calc(0.6rem - var(--border-width));
  aspect-ratio: 1;
  /* height: auto; */
  /* object-fit: contain; */
}

.actions {
  padding: 0.6rem;
  display: flex;
  gap: 0.6rem;
}

.button {
  width: 100%;
}

.name {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-top: var(--border-width) solid var(--border);
  border-bottom: var(--border-width) solid var(--border);
}

a:hover .name,
a:focus-within .name {
  background-color: var(--element-focus);
}
</style>
