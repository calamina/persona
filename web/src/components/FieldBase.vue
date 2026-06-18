<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'
import InputBase from './InputBase.vue'
import FieldWrapper from './FieldWrapper.vue'

const {
  id,
  placeholder,
  label,
  errorMessage,
  hint,
  type = 'text',
  required = true,
} = defineProps<{
  id: string
  label?: string
  type?: InputTypeHTMLAttribute
  placeholder?: string
  errorMessage?: string
  hint?: string
  required?: boolean
}>()

const model = defineModel<string>()
</script>

<template>
  <FieldWrapper :id :label :error-message="errorMessage ?? hint" :hint>
    <InputBase
      v-model="model"
      :id
      :type
      :placeholder
      :required
      :has-hint="!!hint"
      v-bind="$attrs"
    />
  </FieldWrapper>
</template>
