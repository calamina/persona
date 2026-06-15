import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { sendEmail } from "./mail";
import { db } from "./db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000/api/auth",
  trustedOrigins: ["http://localhost:5173", process.env.BETTER_AUTH_TRUSTED_ORIGINS || "https://persona.calamina.cafe"],
  plugins: [username()],
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    onExistingUserSignUp: async ({ user }) => {
      console.log(`Someone tried to sign up with ${user.email}`);
    },

    sendResetPassword: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },

    onPasswordReset: async ({ user }) => {
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    async afterEmailVerification(user) {
      console.log(`${user.email} has been successfully verified!`);
    },
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
});

type AuthSession = typeof auth.$Infer.Session;

declare module "hono" {
  interface ContextVariableMap {
    user: AuthSession["user"] | null;
    session: AuthSession["session"] | null;
  }
}
