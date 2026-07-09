<script setup lang="ts">
import ButtonBase from '../../components/ButtonBase.vue'

const themes = ['maxi', 'mini', 'micro', 'chromi'] as const
type Theme = (typeof themes)[number]

const switchTheme = () => {
  const currentTheme = localStorage.getItem('theme') as Theme

  const currentIndex = themes.indexOf(currentTheme)
  const nextIndex = (currentIndex + 1) % themes.length
  const newTheme = themes[nextIndex]

  document.querySelector('html')?.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}
</script>

<template>
  <ButtonBase @click="switchTheme()" label="Switch theme" icon="theme" class="button" />
</template>

<style scoped>
.button {
  flex-shrink: 0;
  width: fit-content;
  gap: var(--list-gap);
}

.icon {
  height: 75%;
}
</style>
