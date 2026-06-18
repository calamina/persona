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
      <ButtonBase class="button-full" @click="cancel()" label="Cancel" icon="favoriteDelete" />
      <ButtonLoading
        class="button-full"
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
  display: grid;
  grid-template-columns: 1fr auto;
  height: fit-content;
  background-color: var(--element);
  padding: var(--spacing);
  width: 100%;
  border-bottom: var(--border);
  /* background-color: var(--element-alt); */
  /* border: var(--border); */
  /* border-radius: var(--spacing); */

  @media (max-width: 1250px) {
    flex-flow: column;
  }
}

.test {
  color: red !important;
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
  align-self: center;
  aspect-ratio: 1;
  object-fit: cover;
  width: 5rem;
  border-left: var(--border);
  border-right: var(--border);
  /* height: auto; */
  /* border-top-left-radius: calc(var(--spacing) - var(--border-width));
  border-top-right-radius: calc(var(--spacing) - var(--border-width)); */
}

.actions {
  padding: var(--spacing);
  display: flex;
  gap: var(--spacing);
}

.button {
  width: 100%;
}

.name {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing);
  border-top: var(--border);
  border-bottom: var(--border);
}

a:hover .name,
a:focus-within .name {
  background-color: var(--element-focus);
}
</style>
