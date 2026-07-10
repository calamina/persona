<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import ButtonBase from '../../components/ButtonBase.vue'

const themes = ['maxi', 'mini', 'micro', 'chromi'] as const
type Theme = (typeof themes)[number]

const mode = useColorMode<Theme>({
  attribute: 'data-theme',
  initialValue: 'maxi',
  modes: {
    light: 'maxi',
    dark: 'chromi',
    mini: 'mini',
    micro: 'micro',
  },
})

const switchTheme = () => {
  const currentIndex = themes.indexOf(mode.value as Theme)
  const nextIndex = (currentIndex + 1) % themes.length

  mode.value = themes[nextIndex]
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
