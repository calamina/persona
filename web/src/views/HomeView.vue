<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { authClient } from '../utils/auth-client'
import { router } from '../utils/router'

onBeforeMount(async () => {
  const { data } = await authClient.getSession()
  if (data?.session) router.push('/dashboard')
})
</script>

<template>
  <p>
    <router-link to="/auth/login">login</router-link>
    or
    <router-link to="/auth/register">register</router-link>
    to access your
    <router-link to="/dashboard">dashboard</router-link>
    !
  </p>
</template>

<style scoped>
p {
  width: 100%;
  text-align: center;
}
</style>
