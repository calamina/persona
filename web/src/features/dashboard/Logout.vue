<script setup lang="ts">
import { ref } from 'vue'
import ButtonBase from '../../components/ButtonBase.vue'
import { handleLogout } from '../auth/auth.service'
import { router } from '../../utils/router.ts'

const loading = ref(false)

const logout = async () => {
  loading.value = true
  const { data, error } = await handleLogout()
  if (data) router.push('/')
  console.debug(data, error?.message)
  loading.value = false
}
</script>

<template>
  <ButtonBase @click="logout()" icon="logout" label="logout" class="logout" />
</template>

<style scoped>
.logout {
  background-color: transparent;
  border: none;
  :global(path) {
    stroke: var(--color);
  }
}
</style>
