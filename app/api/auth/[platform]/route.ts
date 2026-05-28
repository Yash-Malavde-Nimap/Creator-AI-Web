import { NextRequest, NextResponse } from 'next/server';

import {
  generateState,
  generateCodeVerifier,
  generateCodeChallenge,
  getPlatformConfig,
  OAUTH_COOKIES,
  cookieOpts,
  STATE_MAX_AGE,
  appUrl,
} from '@/lib/oauth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  const isChange = req.nextUrl.searchParams.get('change') === 'true';
  const config = getPlatformConfig(platform);

  const base = appUrl();

  if (!config) {
    return NextResponse.redirect(`${base}/social-media?error=unknown_platform`);
  }

  if (!config.clientId) {
    return NextResponse.redirect(`${base}/social-media?error=not_configured&platform=${platform}`);
  }

  const state       = generateState();
  const redirectUri = `${appUrl()}/api/auth/${platform}/callback`;
  const sep         = config.scopeSep ?? ' ';

  const url = new URL(config.authUrl);
  url.searchParams.set('client_id',     config.clientId);
  url.searchParams.set('redirect_uri',  redirectUri);
  url.searchParams.set('scope',         config.scopes.join(sep));
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('state',         state);

  if (config.reAuthParams) {
    for (const [k, v] of Object.entries(config.reAuthParams)) {
      url.searchParams.set(k, v);
    }
  }

  let codeVerifier: string | undefined;
  if (config.pkce) {
    codeVerifier = generateCodeVerifier();
    url.searchParams.set('code_challenge',        generateCodeChallenge(codeVerifier));
    url.searchParams.set('code_challenge_method', 'S256');
  }

  const response = NextResponse.redirect(url.toString());
  response.cookies.set(OAUTH_COOKIES.state(platform), state, cookieOpts(STATE_MAX_AGE));
  if (codeVerifier) {
    response.cookies.set(
      OAUTH_COOKIES.codeVerifier(platform),
      codeVerifier,
      cookieOpts(STATE_MAX_AGE)
    );
  }

  // Clear any existing token for this platform when switching accounts so the
  // status endpoint shows disconnected while the new auth flow is in progress.
  if (isChange) {
    response.cookies.delete(OAUTH_COOKIES.accessToken(platform));
    response.cookies.delete(OAUTH_COOKIES.username(platform));
  }

  return response;
}
