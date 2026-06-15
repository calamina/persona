import { usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'
export const authClient = createAuthClient({
  plugins: [usernameClient()],
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3005',
})

// alternative
// export const { signIn, signUp, useSession } = createAuthClient()
