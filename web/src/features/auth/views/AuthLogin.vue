<script setup lang="ts">
import { useRoute } from 'vue-router'
import FieldBase from '../../../components/FieldBase.vue'
import FieldPassword from '../../../components/FieldPassword.vue'
import TextInfo from '../../../components/TextInfo.vue'
import { ref, useTemplateRef } from 'vue'
import ErrorBase from '../../../components/ErrorBase.vue'
import { handleLogin } from '../auth.service.ts'
import { loginSchema } from '../auth.schema.ts'
import { router } from '../../../utils/router.ts'
import ButtonLoading from '../../../components/ButtonLoading.vue'
import LayoutWindow from '../../../layouts/LayoutWindow.vue'

const query = useRoute().query
const verified = query.verified === 'verified'
const registered = query.registered === 'registered'

const loginForm = useTemplateRef('loginForm')
const loading = ref(false)
const errorMessage = ref<string | null>(null)

const login = async () => {
  loading.value = true

  const formData = new FormData(loginForm?.value ?? undefined)
  const formDataObj = Object.fromEntries(formData.entries())
  const parsedData = loginSchema.parse(formDataObj)
  const { data, error } = await handleLogin(parsedData)

  if (data) {
    router.push('/dashboard')
    errorMessage.value = null
  }
  if (error?.message) errorMessage.value = error?.message

  loading.value = false
}
</script>

<template>
  <div class="login">
    <LayoutWindow title="Login" icon="user" class="login-window">
      <form ref="loginForm" class="form" @submit.prevent="login">
        <div class="fields">
          <FieldBase
            id="identifier"
            label="Username (or Email)"
            minlength="3"
            error-message="At least 3 characters"
          />
          <FieldPassword
            id="password"
            label="Password"
            minlength="12"
            error-message="At least 12 characters"
          />
          <ErrorBase :errorMessage />
        </div>
        <ButtonLoading :loading label="Login" class="large" />
        <TextInfo v-if="verified">Verified! You can login :)</TextInfo>
        <TextInfo v-if="registered">Registered! Check your email :)</TextInfo>
      </form>
    </LayoutWindow>

    <TextInfo>
      Don't have an account?
      <router-link to="/auth/register">Register</router-link>
    </TextInfo>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.login-window {
  width: fit-content;
}

form {
  width: 25rem;
  gap: var(--item-gap);
}

.fields {
  padding: var(--modal-spacing);
}

.large {
  border: none;
  border-radius: 0;
  width: 100%;
  height: fit-content;
  padding: var(--spacing-small);
  border-top: var(--border);
}
</style>
