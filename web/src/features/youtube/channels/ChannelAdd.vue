<script setup lang="ts">
import { ref } from 'vue'
import { useYoutubeStore } from '../youtube.store'
import type { Channel } from '../youtube.model'
import { addChannel, searchChannel } from '../youtube.service'
import ButtonLoading from '../../../components/ButtonLoading.vue'
import FieldBase from '../../../components/FieldBase.vue'
import ButtonBase from '../../../components/ButtonBase.vue'

const emit = defineEmits(['added'])
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
      <ButtonBase class="small" @click="cancel()" label="Cancel" icon="favoriteDelete" />
      <ButtonLoading
        class="small"
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
  border: 2.5px solid var(--border);
  background-color: var(--element);
  padding: 0.6rem;
  width: auto;
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
  width: 100%;
}

img {
  border-top-left-radius: calc(0.6rem - 2.5px);
  border-top-right-radius: calc(0.6rem - 2.5px);
  width: 100%;
  /* height: auto; */
  object-fit: cover;
}

.actions {
  padding: 0.6rem;
  display: flex;
  gap: 0.6rem;
}

.small {
  width: fit-content;
}

.name {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-top: 2.5px solid var(--border);
  border-bottom: 2.5px solid var(--border);
}

a:hover .name,
a:focus-within .name {
  background-color: var(--element-focus);
}
</style>
