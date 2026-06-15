<script setup lang="ts">
import type { TextColor } from '../models/ui'
import Text from './TextBase.vue'

const { type, id, content } = defineProps<{
  type: 'error' | 'hint'
  id: string
  content: string | undefined
}>()

const textColor: TextColor = type === 'error' ? 'highlight' : 'dim'
const elementId = `${id}-${type}`
</script>

<template v-if="content">
  <Text
    :id="elementId"
    size="xs"
    margin="none"
    :text-color="textColor"
    :class="[type === 'error' ? 'error-msg' : 'hint-msg']"
    {...props}
  >
    {{ content }}
  </Text>
</template>

<style scoped>
.error-msg {
  display: none;
}

.hint-msg {
  display: block;
}

:global(.field-wrapper:has(:user-invalid) .error-msg) {
  display: block;
}

:global(.field-wrapper:has(:user-invalid) .hint-msg) {
  display: none;
}
</style>
