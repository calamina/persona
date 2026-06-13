import { usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'
export const authClient = createAuthClient({
  plugins: [usernameClient()],
  baseURL: 'http://localhost:3000',
})

// alternative
// export const { signIn, signUp, useSession } = createAuthClient()
