<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ChannelDisplay } from './youtube.model'
import { deleteChannel } from './youtube.service.ts'
import ButtonLoading from '../../components/ButtonLoading.vue'
import { useYoutubeStore } from './youtube.store.ts'
import { storeToRefs } from 'pinia'

const store = useYoutubeStore()
const { channels } = storeToRefs(store)

const deletingChannelId = ref<number | null>(null)

onMounted(async () => {
  await store.loadChannels()
  await store.loadVideos()
})

const remove = async (channel: ChannelDisplay) => {
  deletingChannelId.value = channel.id

  const { data } = await deleteChannel(channel.id)
  if (data) {
    store.clearVideoCache()
    await store.loadChannels()
    await store.loadVideos(true)
  }

  deletingChannelId.value = null
}
</script>

<template>
  <div class="list">
    <a class="channel" v-for="channel in channels" :key="channel.id" :href="channel.url" :title="channel.name">
      <img :src="channel.iconURL" :alt="channel.name + ' channel icon'" referrerpolicy="no-referrer" />
      <p>{{ channel.name }}</p>

      <ButtonLoading
        :loading="deletingChannelId === channel.id"
        @click.prevent="remove(channel)"
        class="deleteButton"
        icon="favoriteDelete"
      />
    </a>
  </div>
</template>

<style scoped>
.deleteButton {
  border: none;
  display: none;
  background-color: transparent;
  border: 2.5px solid transparent;

  &:focus-within {
    background-color: var(--element-focusmax);
  }
}

.list {
  height: 100%;
  overflow-y: scroll;
  scrollbar-color: var(--color) transparent;
}

a {
  text-decoration: none;
  color: var(--color);
  padding: 0.6rem;
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  gap: 1ch;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
    button {
      display: flex;
    }
  }
}

p {
  flex: 1;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

img {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 0.3rem;
}
</style>
