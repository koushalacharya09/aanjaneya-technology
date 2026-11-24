import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = process.env.AUTH_ADMIN_EMAIL;
        const password = process.env.AUTH_ADMIN_PASSWORD;
        if (!email || !password) return null;
        if (
          credentials?.email === email &&
          credentials?.password === password
        ) {
          return { id: "admin", email, name: "Admin" };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.AUTH_SECRET,
});
