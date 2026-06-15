<script setup lang="ts">
import type { TextColor } from '../models/ui'

const {
  margin = 'md',
  size = 'sm',
  textColor = 'regular',
  classX = undefined,
  ...props
} = defineProps<{
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  textColor?: TextColor
  classX?: string
}>()

const marginStyles = {
  none: '0',
  xs: '0.3rem',
  sm: '0.6rem',
  md: '0.9rem',
  lg: '1.2rem',
}
const sizeStyles = {
  xs: '0.9rem',
  sm: '0.95rem',
  md: '1rem',
  lg: '1.2rem',
}
const colorStyles = {
  regular: 'var(--color)',
  dim: 'var(--color-dim)',
  highlight: 'var(--color-highlight)',
}

const style = {
  ['margin-top']: marginStyles[margin],
  ['font-size']: sizeStyles[size],
  ['color']: colorStyles[textColor],
}
</script>

<template>
  <p :class="classX" :style="style" :props>
    <slot />
  </p>
</template>

<style scoped>
p {
  line-height: 1.1rem;
}
</style>
