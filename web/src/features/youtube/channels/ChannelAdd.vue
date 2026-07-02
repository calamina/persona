<script setup lang="ts">
import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Channel } from '../youtube.model'
import { addChannel, searchChannel } from '../youtube.service'
import ButtonLoading from '../../../components/ButtonLoading.vue'
import ButtonBase from '../../../components/ButtonBase.vue'
import FieldAction from '../../../components/FieldAction.vue'

const queryClient = useQueryClient()
const query = ref('')
const result = ref<Channel | null>(null)

const { mutate: search, isPending: loadingSearch } = useMutation({
  mutationFn: async (searchQuery: string) => {
    if (!searchQuery.length) return null
    const data = await searchChannel(searchQuery)
    return data ?? null
  },
  onSuccess: (data) => {
    result.value = data
  },
})

const cancel = () => {
  result.value = null
  query.value = ''
}

const { mutate: follow, isPending: loadingAdd } = useMutation({
  mutationFn: async (channelData: Channel) => {
    const data = await addChannel(channelData)
    return data
  },
  onSuccess: (data) => {
    if (data) {
      queryClient.invalidateQueries({ queryKey: ['youtube-channels'] })
      queryClient.invalidateQueries({ queryKey: ['youtube-videos'] })
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
  height: calc(var(--icon-size) * 2);
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
  height: var(--icon-size);

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
