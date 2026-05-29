import { randomBytes, createHash } from 'crypto';

/* ── Cookie key helpers ─────────────────────────────────────────────────── */

export const OAUTH_COOKIES = {
  state:        (p: string) => `oauth_state_${p}`,
  codeVerifier: (p: string) => `oauth_cv_${p}`,
  accessToken:  (p: string) => `${p}_at`,
  username:     (p: string) => `${p}_un`,
} as const;

/* ── TTLs ───────────────────────────────────────────────────────────────── */

export const TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
export const STATE_MAX_AGE = 60 * 10;            // 10 minutes (OAuth state / PKCE verifier)

/* ── Cookie option factory ──────────────────────────────────────────────── */

export function cookieOpts(maxAge: number, httpOnly = true) {
  return {
    httpOnly,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path:     '/',
    maxAge,
  };
}

/* ── PKCE helpers ───────────────────────────────────────────────────────── */

export function generateState(): string {
  return randomBytes(16).toString('hex');
}

export function generateCodeVerifier(): string {
  return randomBytes(32).toString('base64url');
}

export function generateCodeChallenge(verifier: string): string {
  return createHash('sha256').update(verifier).digest('base64url');
}

/* ── App base URL ───────────────────────────────────────────────────────── */

export function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
}

/* ── Platform config ────────────────────────────────────────────────────── */

export interface PlatformConfig {
  clientId:     string;
  clientSecret: string;
  authUrl:      string;
  tokenUrl:     string;
  /** Provider token revocation endpoint — undefined means not supported */
  revokeUrl?:   string;
  scopes:       string[];
  /** Separator for the scope string — default is space, Instagram/Threads use comma */
  scopeSep?:    string;
  userInfoUrl:  string;
  parseUsername: (profile: Record<string, unknown>) => string;
  /** X (Twitter) OAuth 2.0 requires PKCE */
  pkce?: boolean;
  /** X uses HTTP Basic Auth instead of client credentials in the token body */
  useBasicAuthForToken?: boolean;
  /** Extra query params appended to authUrl when the user wants to switch accounts */
  reAuthParams?: Record<string, string>;
}

export function getPlatformConfig(platform: string): PlatformConfig | null {
  const configs: Record<string, PlatformConfig> = {
    instagram: {
      clientId:     process.env.INSTAGRAM_CLIENT_ID     ?? '',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET ?? '',
      authUrl:      'https://api.instagram.com/oauth/authorize',
      tokenUrl:     'https://api.instagram.com/oauth/access_token',
      scopes:       ['user_profile', 'user_media'],
      scopeSep:     ',',
      userInfoUrl:  'https://graph.instagram.com/me?fields=id,username',
      parseUsername: (p) => String(p.username ?? p.id ?? ''),
      reAuthParams: { auth_type: 'reauthenticate' },
    },

    facebook: {
      clientId:     process.env.FACEBOOK_APP_ID     ?? '',
      clientSecret: process.env.FACEBOOK_APP_SECRET ?? '',
      authUrl:      'https://www.facebook.com/v18.0/dialog/oauth',
      tokenUrl:     'https://graph.facebook.com/v18.0/oauth/access_token',
      scopes:       ['pages_manage_posts', 'pages_read_engagement'],
      userInfoUrl:  'https://graph.facebook.com/me?fields=id,name',
      parseUsername: (p) => String(p.name ?? p.id ?? ''),
      reAuthParams: { auth_type: 'reauthenticate' },
    },

    threads: {
      clientId:     process.env.THREADS_APP_ID     ?? '',
      clientSecret: process.env.THREADS_APP_SECRET ?? '',
      authUrl:      'https://threads.net/oauth/authorize',
      tokenUrl:     'https://graph.threads.net/oauth/access_token',
      scopes:       ['threads_basic', 'threads_content_publish'],
      scopeSep:     ',',
      userInfoUrl:  'https://graph.threads.net/me?fields=id,username',
      parseUsername: (p) => String(p.username ?? p.id ?? ''),
      reAuthParams: { prompt: 'login' },
    },

    linkedin: {
      clientId:     process.env.LINKEDIN_CLIENT_ID     ?? '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? '',
      authUrl:      'https://www.linkedin.com/oauth/v2/authorization',
      tokenUrl:     'https://www.linkedin.com/oauth/v2/accessToken',
      revokeUrl:    'https://www.linkedin.com/oauth/v2/revoke',
      // LinkedIn deprecated r_liteprofile / r_emailaddress in 2023.
      // Current API uses OpenID Connect scopes via the "Sign In with LinkedIn
      // using OpenID Connect" product — enable it in the LinkedIn developer portal.
      scopes:       ['openid', 'profile', 'w_member_social'],
      userInfoUrl:  'https://api.linkedin.com/v2/userinfo',
      parseUsername: (p) => String(p.name ?? p.given_name ?? p.sub ?? ''),
      // max_age=0 is the OpenID Connect standard parameter that forces
      // the provider to re-authenticate the user even if a session exists.
      reAuthParams: { prompt: 'login', max_age: '0' },
    },

    x: {
      clientId:     process.env.TWITTER_CLIENT_ID     ?? '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? '',
      authUrl:      'https://twitter.com/i/oauth2/authorize',
      tokenUrl:     'https://api.twitter.com/2/oauth2/token',
      revokeUrl:    'https://api.twitter.com/2/oauth2/revoke',
      scopes:       ['tweet.read', 'users.read', 'offline.access'],
      userInfoUrl:  'https://api.twitter.com/2/users/me?user.fields=username',
      parseUsername: (p) => {
        const data = p.data as Record<string, unknown> | undefined;
        return String(data?.username ?? p.username ?? '');
      },
      pkce:                true,
      useBasicAuthForToken: true,
      // X doesn't reliably support prompt=login in OAuth 2.0 — revocation handles disconnect instead
    },
  };

  return configs[platform] ?? null;
}
