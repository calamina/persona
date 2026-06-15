<script setup lang="ts">
import { iconMap, type IconName } from '../../utils/icon'

const { name } = defineProps<{
  name: IconName
}>()

const IconComponent = iconMap[name]
</script>

<template>
  <div>
    <component :is="IconComponent" />
  </div>
</template>

<style scoped>
div {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  min-width: 24px;
  color: var(--icon);

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
