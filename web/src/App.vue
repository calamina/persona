<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from './api-client'
import { authClient } from './utils/auth-client'

const message = ref('Loading...')

onMounted(async () => {
  const res = await api.index.$get()
  const data = await res.text()
  message.value = data
})

async function login() {
  await authClient.signIn.username({
    // email: 'user@example.com',
    password: 'password123',
    username: 'testos',
  })
}
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
  <button @click="login">login bitch !</button>
</template>
