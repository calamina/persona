<script setup lang="ts">
import { ref } from 'vue'
import { useYoutubeStore } from '../youtube.store'
import type { Channel } from '../youtube.model'
import { addChannel, searchChannel } from '../youtube.service'
import ButtonLoading from '../../../components/ButtonLoading.vue'
import ButtonBase from '../../../components/ButtonBase.vue'
import FieldAction from '../../../components/FieldAction.vue'

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
  <FieldAction
    v-model="query"
    :action="search"
    :loading="loadingSearch"
    icon="favoriteSearch"
    label="Search"
    placeholder="search channels ..."
  />
  <div v-if="result" class="element result">
    <a :href="result.url" :title="result.name">
      <img
        :src="result.iconURL"
        :alt="result.name + ' channel icon'"
        referrerpolicy="no-referrer"
      />
      <p class="name">{{ result.name }}</p>
    </a>
    <div class="channel-actions">
      <ButtonBase class="button" @click="cancel()" label="Cancel" icon="favoriteDelete" />
      <ButtonLoading
        class="button"
        :loading="loadingAdd"
        @click="subscribe()"
        label="Follow"
        icon="favoriteAdd"
      />
    </div>
  </div>
</template>

<style scoped>
.element {
  padding: var(--spacing);
  width: 100%;
  border-bottom: var(--border);

  @media (max-width: 1250px) {
    flex-flow: column;
  }
}

.result {
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0;
  height: fit-content;
}

a {
  display: flex;
  text-decoration: none;
  overflow: hidden;
  border-right: var(--border);
  height: fit-content;
}

img {
  align-self: center;
  object-fit: cover;
  height: calc(2.1rem * 2);
  border-right: var(--border);
}

.channel-actions {
  display: flex;
  flex-flow: column;
}

.button {
  width: 100%;
  border: none;
  border-radius: 0;
  height: 2.1rem;

  &:first-child {
    border-bottom: var(--border);
  }
}

.name {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing);
}

a:hover .name,
a:focus-within .name {
  background-color: var(--element-focus);
}
</style>
