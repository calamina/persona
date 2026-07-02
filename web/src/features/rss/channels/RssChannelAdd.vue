<script setup lang="ts">
import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addFeed, searchFeed } from '../rss.service.ts'
import FieldAction from '../../../components/FieldAction.vue'
import ButtonBase from '../../../components/ButtonBase.vue'
import ButtonLoading from '../../../components/ButtonLoading.vue'
import InputBase from '../../../components/InputBase.vue'
import type { Feed } from '../rss.model.ts'

const queryClient = useQueryClient()
const query = ref('')
const result = ref<Feed | null>(null)

const { mutate: search, isPending: loadingSearch } = useMutation({
  mutationFn: async (searchQuery: string) => {
    if (!searchQuery.length) return
    return await searchFeed(searchQuery)
  },
  onSuccess: (data) => {
    if (data) result.value = data
    else result.value = null
  },
})

const cancel = () => {
  result.value = null
  query.value = ''
}

const { mutate: follow, isPending: loadingAdd } = useMutation({
  mutationFn: async (feedData: Feed) => {
    const data = await addFeed(feedData)
    return data
  },
  onSuccess: (data) => {
    if (data) {
      queryClient.invalidateQueries({ queryKey: ['rss-channels'] })
      queryClient.invalidateQueries({ queryKey: ['rss-feeds'] })
      cancel()
    }
  },
})
</script>

<template>
  <FieldAction
    v-model="query"
    :action="() => search(query)"
    :loading="loadingSearch"
    icon="favoriteSearch"
    label="Search"
    placeholder="search ..."
  />
  <div v-if="result" class="element result-wrap">
    <InputBase id="feedTitle" v-model="result.name" class="input" />
    <div class="channel-actions">
      <ButtonBase class="button" @click="cancel()" label="Cancel" icon="favoriteDelete" />
      <ButtonLoading
        class="button"
        :loading="loadingAdd"
        @click="follow(result)"
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
