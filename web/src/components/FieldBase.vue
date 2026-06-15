<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'
import InputBase from './InputBase.vue'
import FieldWrapper from './FieldWrapper.vue'

const {
  id,
  placeholder = undefined,
  label,
  errorMessage = undefined,
  hint = undefined,
  type = 'text',
  required = true,
} = defineProps<{
  id: string
  label: string
  type?: InputTypeHTMLAttribute
  placeholder?: string
  errorMessage?: string
  hint?: string
  required?: boolean
}>()
</script>

<template>
  <div class="field-wrapper">
    <FieldWrapper :id :label :error-message="errorMessage ?? hint" :hint>
      <InputBase :id :type :placeholder :required :has-hint="!!hint" v-bind="$attrs" />
    </FieldWrapper>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-flow: column;
  position: relative;
}
</style>
