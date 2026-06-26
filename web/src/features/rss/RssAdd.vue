<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useRssStore } from './rss.store.ts'
import { addFeed, searchFeed } from './rss.service.ts'
import FieldAction from '../../components/FieldAction.vue'
import ButtonBase from '../../components/ButtonBase.vue'
import ButtonLoading from '../../components/ButtonLoading.vue'
import InputBase from '../../components/InputBase.vue'
import type { Feed } from './rss.model.ts'

const store = useRssStore()

const loadingSearch = ref(false)
const loadingAdd = ref(false)
const query = ref('')
const input = useTemplateRef<HTMLInputElement>('input')
const result = ref<Feed | null | undefined>(null)

const search = async () => {
  if (!query.value.length) return
  loadingSearch.value = true
  const { data } = await searchFeed(query.value)
  if (data) {
    result.value = data
    input.value?.focus()
  } else result.value = null
  loadingSearch.value = false
}

const cancel = () => {
  result.value = null
  query.value = ''
}

const follow = async () => {
  if (!result.value) return
  loadingAdd.value = true
  const { data } = await addFeed(result.value)
  if (data) {
    await store.loadFeeds()
    await store.fetchRssFeeds(true)
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
    placeholder="search ..."
  />
  <div v-if="result" class="element result-wrap">
    <InputBase id="feedTitle" v-model="result.name" ref="input" class="input" />
    <div class="channel-actions">
      <ButtonBase class="button" @click="cancel()" label="Cancel" icon="favoriteDelete" />
      <ButtonLoading
        class="button"
        :loading="loadingAdd"
        @click="follow()"
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

.result-wrap {
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0;
  height: fit-content;
}

img {
  align-self: center;
  object-fit: cover;
  height: calc(var(--icon-size) * 2);
  border-right: var(--border);
}

.input {
  border: none;
}

.channel-actions {
  display: flex;
}

.button {
  width: 100%;
  border: none;
  border-radius: 0;
  height: var(--icon-size);

  &:first-child {
    border-right: var(--border);
  }
}
</style>
