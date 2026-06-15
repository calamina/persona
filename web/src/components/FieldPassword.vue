<script setup lang="ts">
import { computed, ref } from 'vue'
import FieldWrapper from './FieldWrapper.vue'
import Icon from './icons/IconBase.vue'
import InputBase from './InputBase.vue'

const {
  id,
  label,
  errorMessage = undefined,
  hint = undefined,
  required = true,
} = defineProps<{
  id: string
  label: string
  errorMessage?: string
  hint?: string
  required?: boolean
}>()

const type = ref('password')
const isPassword = computed(() => type.value === 'password')

const toggleVisibility = () => {
  type.value = isPassword.value ? 'text' : 'password'
}
</script>

<template>
  <FieldWrapper :id :label :error-message="errorMessage ?? hint" :hint>
    <div>
      <InputBase :id :type :required :has-hint="!!hint" has-button v-bind="$attrs" />
      <button type="button" aria-label="Show password" @click="toggleVisibility">
        <Icon v-if="isPassword" name="show" class="toggle-icon" />
        <Icon v-else name="hide" class="toggle-icon" />
      </button>
    </div>
  </FieldWrapper>
</template>

<style scoped>
div {
  position: relative;
  display: flex;
  width: 100%;
}

button {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  border-top-right-radius: 0.3rem;

  &:focus-visible {
    background-color: var(--element-focus);
    .toggle-icon {
      color: var(--element);
    }
  }
}

div:has(input:user-invalid) {
  button {
    border-color: var(--color-highlight);
  }
  .toggle-icon {
    color: var(--color-highlight);
  }
}
</style>
