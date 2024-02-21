import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/signin",
    signOut: '/signout',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const res = await fetch(`https://jwt-bearer-auth1.p.rapidapi.com/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    'X-RapidAPI-Key': process.env.API_KEY as string,
                    'X-RapidAPI-Host': 'jwt-bearer-auth1.p.rapidapi.com'
                  },
                  body: JSON.stringify({email, password}),
        });
        let user = await res.json();
        user = {email}
        if (res.ok && user) {
          return user;
        }
        return null;

      },
    }),
  ],
});

export { handler as GET, handler as POST };
