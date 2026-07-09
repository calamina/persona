<script setup lang="ts">
import LabelBase from './LabelBase.vue'
import TextHint from './TextHint.vue'

const {
  id,
  label,
  errorMessage = 'This field is required or invalid.',
  hint = undefined,
} = defineProps<{
  id: string
  label?: string
  errorMessage?: string
  hint?: string
}>()
</script>

<template>
  <div class="field-wrapper">
    <LabelBase v-if="label" :id :label />
    <slot />
    <TextHint :id :content="hint" type="hint" class="hint-msg" />
    <TextHint :id :content="errorMessage" type="error" class="error-msg" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-flow: column;
  position: relative;
  gap: var(--list-gap);
}
</style>
