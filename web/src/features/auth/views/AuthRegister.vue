<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import ButtonBase from '../../../components/ButtonBase.vue'
import FieldBase from '../../../components/FieldBase.vue'
import FieldPassword from '../../../components/FieldPassword.vue'
import TextInfo from '../../../components/TextInfo.vue'
import { registerSchema } from '../auth.schema.ts'
import { handleRegister } from '../auth.service.ts'
import ErrorBase from '../../../components/ErrorBase.vue'

const registerForm = useTemplateRef('registerForm')
const loading = ref(false)

const register = async () => {
  loading.value = true

  const formData = new FormData(registerForm?.value ?? undefined)
  const formDataObj = Object.fromEntries(formData.entries())
  const parsedData = registerSchema.parse(formDataObj)
  const { data, error } = await handleRegister(parsedData)
  console.debug(data, error?.message)
  loading.value = false
}
</script>

<template>
  <form ref="registerForm" class="form" @submit.prevent="register">
    <div class="fields">
      <FieldBase id="username" minlength="3" hint="At least 3 characters" label="Username" />
      <FieldBase id="email" label="Email" type="email" error-message="Must be a valid email" />
      <FieldPassword id="password" label="Password" minlength="12" hint="At least 12 characters" />
      <ErrorBase />
    </div>
    <ButtonBase type="submit" label="Register" />
    <TextInfo>
      Already have an account ?
      <router-link to="/auth/login">Login</router-link>
    </TextInfo>
  </form>
</template>
