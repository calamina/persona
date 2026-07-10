<script setup lang="ts">
import { computed } from 'vue'
import IconBase from './icons/IconBase.vue'

const props = defineProps<{
  src?: string | null
  alt?: string
}>()

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
const videoExtensions = ['mp4', 'webm', 'ogg', 'mov']

const mediaType = computed(() => {
  if (!props.src) return null
  const extension = props.src.split('.').pop()?.split(/#|\?/)[0].toLowerCase()
  if (!extension) return null

  if (imageExtensions.includes(extension)) return 'image'
  if (videoExtensions.includes(extension)) return 'video'
  return null
})
</script>

<template>
  <video
    v-if="mediaType === 'video' && src"
    :src="src"
    width="100"
    autoplay
    playsinline
    muted
    loop
    crossorigin="anonymous"
    class="media"
  ></video>
  <img
    v-else-if="mediaType === 'image' && src"
    :src="src"
    width="100"
    :alt="alt || 'thumbnail'"
    referrerpolicy="no-referrer"
    class="media"
  />
  <div v-else class="placeholder">
    <IconBase name="smile" />
  </div>
</template>

<style scoped>
.media,
.placeholder {
  border-radius: var(--border-radius-small);
  width: 100%;
  height: 4.5rem;
  flex-shrink: 0;
  object-fit: cover;
  background-color: var(--element-focus);
}

.placeholder {
  display: grid;
  place-items: center;
}
</style>
