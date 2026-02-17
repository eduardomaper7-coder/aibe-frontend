import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

async function refreshAccessToken(token: any) {
  try {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const refreshed = await res.json();
    if (!res.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.access_token,
      accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
    };
  } catch (e) {
    console.error("refreshAccessToken error", e);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/business.manage",
          ].join(" "),
          access_type: "offline",
          prompt: "consent",
          include_granted_scopes: "true",
          response_type: "code",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      // 1) Primer login
      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = (account.expires_at ?? 0) * 1000;
        token.refreshToken = account.refresh_token; // puede venir undefined

        // 2) Si viene refresh_token, guardarlo en Railway via backend
        if (account.refresh_token) {
          try {
            const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
            if (API_BASE) {
              await fetch(`${API_BASE}/auth/google/nextauth/link`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  refresh_token: account.refresh_token,
                  access_token: account.access_token,
                  scope: account.scope,
                  google_user_id: token.sub,
                }),
              });
            }
          } catch (e) {
            console.error("Could not link refresh_token to backend", e);
          }
        }

        return token;
      }

      // 3) Si no hay expiración, no rompemos
      if (!token.accessTokenExpires) return token;

      // 4) Si aún no expira, ok
      if (Date.now() < (token.accessTokenExpires as number) - 60_000) return token;

      // 5) Expiró: refrescar si hay refreshToken
      if (!token.refreshToken) return token;

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;
      (session as any).error = (token as any).error;
      return session;
    },
  },
};
