<script setup lang="ts">
import type { ChannelDisplay } from '../youtube.model'
import ChannelDelete from './ChannelDelete.vue'

const { channel } = defineProps<{ channel: ChannelDisplay }>()
</script>

<template>
  <a class="channel" :key="channel.id" :href="channel.url" :title="channel.name">
    <img
      :src="channel.iconURL ?? ''"
      :alt="channel.name + ' channel icon'"
      referrerpolicy="no-referrer"
    />
    <p>{{ channel.name }}</p>
    <ChannelDelete :channel />
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
  color: var(--color);
  padding: var(--spacing-small);
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  gap: var(--item-gap);
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: var(--border-radius-small);

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
    button {
      display: flex;
    }
  }

  &:last-child {
    border-bottom-right-radius: calc(var(--border-radius) - var(--spacing-small));
    border-bottom-left-radius: calc(var(--border-radius) - var(--spacing-small));
  }
}

p {
  flex: 1;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

img {
  width: 2.7rem;
  height: 2.7rem;
  border-radius: var(--border-radius-small);
}
</style>
