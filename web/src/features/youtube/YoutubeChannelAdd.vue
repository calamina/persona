<script setup lang="ts">
import { ref } from 'vue'
import FieldBase from '../../components/FieldBase.vue'
import ButtonLoading from '../../components/ButtonLoading.vue'
import { addChannel, searchChannel } from './youtube.service.ts'
import type { Channel } from './youtube.model.ts'
import ButtonBase from '../../components/ButtonBase.vue'
import { useYoutubeStore } from './youtube.store.ts'

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
      <img :src="result.iconURL" :alt="result.name + ' channel icon'" referrerpolicy="no-referrer" />
      <p class="test">{{ result.name }}</p>
    </a>
    <div class="actions">
      <ButtonBase class="small" @click="cancel()" label="Cancel" icon="favoriteDelete" />
      <ButtonLoading class="small" :loading="loadingAdd" @click="subscribe()" label="Subscribe" icon="favoriteAdd" />
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
  gap: 0.6rem;
}

a {
  display: flex;
  flex-flow: column;
  gap: 0.3rem;
  text-decoration: none;
  border-radius: 0.3rem;
  overflow: hidden;
}

img {
  border-radius: 0.3rem;
  width: 100%;
  height: auto;
}

.actions {
  display: flex;
  gap: 0.6rem;
}

.small {
  width: fit-content;
}

.test {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.6rem 0.3rem;
}

a:hover,
a:focus-within {
  outline: 2px solid var(--border);
  background-color: var(--element-focus);
}
</style>
