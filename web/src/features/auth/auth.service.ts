import { authClient } from '../../utils/auth-client'
import type { Login, Register } from './auth.schema'

export async function handleLogin(data: Login) {
  if (data.email) {
    return authClient.signIn.email({
      email: data.email,
      password: data.password,
    })
  }

  if (data.username) {
    return authClient.signIn.username({
      username: data.username,
      password: data.password,
    })
  }

  return {
    data: null,
    error: { message: 'Please provide a valid username or email address.' },
  }
}

export async function handleRegister(data: Register) {
  return authClient.signUp.email({
    email: data.email,
    password: data.password,
    username: data.username,
    name: data.name,
  })
}

export async function handleLogout() {
  return authClient.signOut()
}
