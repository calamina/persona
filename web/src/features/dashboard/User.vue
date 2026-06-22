<script setup lang="ts">
import ButtonBase from '../../components/ButtonBase.vue'
import { authClient } from '../../utils/auth-client'
import { ref } from 'vue'

const username = ref<string | null | undefined>(null)

try {
  const { data } = await authClient.getSession()
  username.value = data?.user?.username
} catch {
  console.debug('no username ?!')
}
</script>

<template>
  <ButtonBase v-if="username" :label="username" icon="user" class="user" />
</template>

<style scoped>
.user {
  background-color: transparent;
  border: none;
  :global(path) {
    stroke: var(--icon-color);
  }
}
</style>
