<script setup lang="ts">
import { ref } from 'vue'
import { api } from '../../utils/api-client'
import type { Channel, Video } from './feed.model.ts'
import { useDateFormat } from '../../utils/date.ts'
import ButtonBase from '../../components/ButtonBase.vue'

const videos = ref<Video[]>([])
const channels = ref<Channel[]>([])
const loading = ref(false)

// TODO :: add dbchannels
// load only if channels
// nice load animation
try {
  loading.value = true
  const response = await api.feed.$get()
  if (response.ok) videos.value = (await response.json()) as Video[]
  loading.value = false
} catch {
  loading.value = false
}

try {
  const response = await api.feed.channels.$get()
  if (response.ok) {
    const res = await response.json()
    channels.value = res.gregoire
  }
} catch {}
</script>

<template>
  <div class="feed">
    <div class="section">
      <div class="actions">
        <ButtonBase class="small" icon="folder" />
        <ButtonBase class="small" icon="faviconToggle" />
        <ButtonBase class="small" icon="favoriteSearch" />
      </div>
      <div class="channels">
        <h2>Channels</h2>
        <a class="channel" v-for="channel in channels" :href="channel.htmlurl"> <span>@ </span>{{ channel.name }} </a>
      </div>
    </div>
    <div class="section">
      <div class="actions">
        <ButtonBase class="small" icon="folder" />
        <ButtonBase class="small" icon="faviconToggle" />
        <ButtonBase class="small" icon="favoriteSearch" />
      </div>
      <div class="videos">
        <h2>Videos</h2>
        <!-- <div v-if="loading">loading ...</div> -->
        <a class="video" v-for="video in videos" :href="'https://www.youtube.com/watch?v=' + video.id">
          <img width="100" :src="`http://img.youtube.com/vi/${video.id}/sddefault.jpg`" alt="" />
          <div class="infos">
            <p class="info">{{ video.title }}</p>
            <p class="info">{{ video.author.name }}</p>
            <p class="info">{{ useDateFormat(video.published) }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed {
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: fit-content;
  gap: 0.6rem;
}

h2 {
  font-size: 1rem;
  font-weight: 300;
  border-bottom: 2.5px solid var(--border);
  padding: 0 0.6rem;
  height: var(--header-size);
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: var(--element);
  grid-column: span 2;
}

.section {
  display: flex;
  flex-flow: column;
  gap: 0.6rem;
  max-height: 40rem;
  height: 40rem;
}

.actions {
  display: flex;
  gap: 0.6rem;
}

.channels,
.videos {
  position: relative;
  max-width: 25rem;
  background-color: var(--element);
  border: 2.5px solid var(--border);
  border-radius: 0.6rem;
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  overflow-y: scroll;
}

a {
  text-decoration: none;
  color: var(--color);
  padding: 0.6rem;

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
  }

  &.video {
    display: grid;
    grid-template-columns: 6rem auto;
    gap: 0.6rem;
  }

  &.channel {
    display: flex;
    flex-flow: row;
    gap: 1ch;

    span {
      color: var(--bg-dim);
    }
  }
}

img {
  border-radius: 0.3rem;
  width: 100%;
  flex-shrink: 0;
  object-fit: cover;
}

.infos {
  overflow: hidden;
}

.info {
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  &:not(:first-child) {
    color: var(--color-dim);
  }
}
</style>
