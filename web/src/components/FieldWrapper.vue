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
  label: string
  errorMessage?: string
  hint?: string
}>()
</script>

<template>
  <div class="field-wrapper">
    <slot />
    <LabelBase :id="id" :label="label" />
    <TextHint :id="id" :content="hint" type="hint" class="hint-msg" />
    <TextHint :id="id" :content="errorMessage" type="error" class="error-msg" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-flow: column;
  position: relative;
}
</style>
