<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { api } from './utils/api-client'
import { RouterView } from 'vue-router'

interface User {
  id: number
  name: string
  age: number
  email: string
}

const user: Ref<null | User> = ref(null)

onMounted(async () => {
  const res = await api.index.$get()
  user.value = await res.json()
})

// async function login() {
//   await authClient.signIn.username({
//     // email: 'user@example.com',
//     password: "password123",
//     username: "testos",
//   });
// }
</script>

<template>
  <RouterView />
</template>
